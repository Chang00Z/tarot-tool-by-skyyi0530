import { useCallback, useEffect, useState } from "react";

/**
 * 自訂 Hook：讓 React 狀態與網址的搜尋參數（search param）同步
 *
 * @param {string} key - 要同步的網址參數名稱（例如 ?foo=bar 的 foo）
 * @param {any} defaultValue - 如果網址沒有這個參數時，預設的值
 * @returns {[any, function]} - [目前狀態值, 設定狀態的函式]
 */
export function useSyncedSearchParam(key, defaultValue) {
  // 用 useCallback 包住，確保每次渲染時不會重複產生新函式，提升效能
  // 這個函式會取得目前網址上的參數值，如果沒有就回傳預設值
  const getParamValue = useCallback(() => {
    // SSR（伺服器端渲染）時 window 可能不存在，要先判斷
    if (typeof window === "undefined") return defaultValue;
    // 取得目前網址的搜尋參數
    const params = new URLSearchParams(window.location.search);
    // 如果有這個 key，就回傳對應的值，否則回傳預設值
    return params.has(key) ? params.get(key) : defaultValue;
  }, [key, defaultValue]);

  // 用 useState 建立一個狀態，初始值就是目前網址參數的值
  // 這樣一開始就能和網址同步
  const [value, setValue] = useState(getParamValue);

  // 當網址的搜尋參數被瀏覽器前進/後退（popstate）改變時，狀態也要跟著更新
  useEffect(() => {
    // popstate 事件：使用者點瀏覽器上一頁、下一頁時會觸發
    const onPopState = () => {
      setValue(getParamValue()); // 重新取得網址參數，更新狀態
    };
    window.addEventListener("popstate", onPopState);
    // 清理函式，元件卸載時移除事件監聽，避免記憶體洩漏
    return () => window.removeEventListener("popstate", onPopState);
  }, [getParamValue]);

  // 當你用 setSyncedValue 改變狀態時，網址參數也會跟著改變
  // 用 useCallback 包住，避免不必要的重複產生
  const setSyncedValue = useCallback(
    (newValue) => {
      setValue(newValue); // 先更新 React 狀態
      // 取得目前網址參數
      const params = new URLSearchParams(window.location.search);
      // 如果新值是空的（undefined/null/空字串），就把參數移除
      if (newValue === undefined || newValue === null || newValue === "") {
        params.delete(key);
      } else {
        params.set(key, newValue); // 否則設定新值
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, "", newUrl);
    },
    [key]
  );

  // 回傳一個陣列：[目前狀態值, 設定狀態的函式]
  // 用法和 useState 一樣，只是會自動同步網址參數
  return [value, setSyncedValue];
}
