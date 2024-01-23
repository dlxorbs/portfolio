import styles from "./MainLayout.module.css";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className={styles.mainlayout}>
      <Header />
      <Outlet />
      {/* {window.location.pathname !== "/" && <Footer />} */}
    </div>
  );
};

export default MainLayout;
