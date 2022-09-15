import React from "react";
import './styles.scss'
const Navbar = () => {
  return (
      <div className="d-flex justify-content-between navbar-container">
      <div className="logoIcon">
        <div className="text-light" >
          SÂN BÓNG ĐÁ
        </div>
      </div>
      <div className="mainMenu">
        <ul className="d-flex">
          <li>TRANG CHỦ</li>
          <li>GIỚI THIỆU</li>
          <li>LIÊN HỆ</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;