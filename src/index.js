import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Mainpage from "./Page/Mainpgae";
import MainLayout from "./Component/layout/MainLayout";
import DetailPage from "./Page/DetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Mainpage />}></Route>
          <Route path="/:id" element={<DetailPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
