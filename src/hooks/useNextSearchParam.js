import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * 自訂 Hook：搭配 Next.js 的導覽 API，讓 React 狀態與網址搜尋參數同步。
 * 這個版本支援 Next.js 的伺服器端渲染（SSR），因此適合在 app router 中使用。
 *
 * @param {string} key - 要同步的網址參數名稱，例如 ?foo=bar 的 foo。
 * @param {any} defaultValue - 如果網址沒有這個參數時要使用的預設值。
 * @returns {[any, function]} - 回傳 [目前參數值, 設定參數值的函式]，用法與 useState 類似。
 */
export function useNextSearchParam(key, defaultValue) {
  // Next.js 提供的三個 hook：
  // router：用來更新網址（push 或 replace）
  // pathname：取得目前頁面的路徑（不含搜尋參數）
  // searchParams：取得目前網址的搜尋參數
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 透過 useMemo 來計算目前的參數值，只有在依賴改變時才重新計算，避免不必要的計算。
  const value = useMemo(() => {
    // 取得指定 key 的參數，如果沒有就回傳預設值。
    const param = searchParams.get(key);
    return param ?? defaultValue;
  }, [searchParams, key, defaultValue]);

  // 回傳給元件使用的 setter，會同時更新 React 狀態與網址。
  const setValue = useCallback(
    (newValue) => {
      // 用目前的搜尋參數建立一份可修改的副本。
      const params = new URLSearchParams(searchParams.toString());
      // 與單純使用 useState 相同，如果設定空值就移除該參數。
      if (newValue === undefined || newValue === null || newValue === "") {
        params.delete(key);
      } else {
        // URLSearchParams 只接受字串，因此用 String() 確保型別正確。
        params.set(key, String(newValue));
      }
      // 生成新的網址：如果還有參數就加上 ?foo=bar，否則只保留路徑。
      const queryString = params.toString();
      const target = queryString ? `${pathname}?${queryString}` : pathname;
      // 使用 router.push 更新網址，scroll: false 可以避免跳動到頁面頂部。
      router.push(target, { scroll: false });
    },
    [router, pathname, searchParams, key]
  );

  // 回傳目前的參數值以及 setter，讓元件能像使用 useState 一樣操作。
  return [value, setValue];
}
