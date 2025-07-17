import React from "react";

export default function Menu({
  showMenu,
  setShowMenu,
  switchToRoleSelect,
  isTouchDevice,
  menuTimeout,
  handleMenuMouseEnter,
  handleMenuMouseLeave,
  handleMenuButtonClick,
}) {
  return (
    <div className="menu-wrapper" onMouseLeave={handleMenuMouseLeave}>
      <div
        className="menu-button"
        id="menu-button"
        onClick={handleMenuButtonClick}
        onMouseEnter={handleMenuMouseEnter}
      >
        ☰ <span className="caret">▾</span>
      </div>
      <div
        className={`menu-panel${showMenu ? " show" : " hidden"}`}
        id="menu-panel"
        onMouseEnter={() => {
          if (!isTouchDevice && menuTimeout.current) clearTimeout(menuTimeout.current);
        }}
      >
        <div className="menu-caret"></div>
        <ul>
          <li onClick={switchToRoleSelect}>← 回到身份選擇</li>
        </ul>
      </div>
    </div>
  );
} 