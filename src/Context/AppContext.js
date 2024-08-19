// AppContext.js
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [headerToggleData, setHeaderToggleData] = useState(() => {
    // 페이지 새로고침 시 로컬 스토리지에서 초기 상태를 가져옵니다.
    const savedToggleState = localStorage.getItem("headerToggleData");
    return savedToggleState === "true";
  });

  useEffect(() => {
    // 토글 상태가 변경될 때마다 로컬 스토리지에 저장합니다.
    localStorage.setItem("headerToggleData", headerToggleData);
  }, [headerToggleData]);

  return (
    <AppContext.Provider value={{ headerToggleData, setHeaderToggleData }}>
      {children}
    </AppContext.Provider>
  );
};
