import React from "react";

export default function RoleSelect({ switchMode }) {
  return (
    <div id="role-select" className="container">
      <h2>請選擇你的身份</h2>
      <div className="button-group">
        <button onClick={() => switchMode("user")}>我是一般使用者</button>
        <button onClick={() => switchMode("reader")}>我是塔羅師</button>
      </div>
    </div>
  );
} 