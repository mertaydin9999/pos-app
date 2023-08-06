// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Badge, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
const Header = ({ setSearch }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const logOut = () => {
    if (window.confirm("Cikis yapmak istediginize emin misiniz?")) {
      localStorage.removeItem("token");
      navigate("/login");
      message.success("Cikis Basarili");
    }
  };
  return (
    <header className="border-b mb-6 py-4 px-6 flex md:first-letter:flex-col justify-between items-center gap-10">
      <div className="logo">
        <Link href="/">
          <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
        </Link>
      </div>
      <div
        className="headee-search flex-1"
        onClick={() => {
          pathname !== "/" && navigate("/");
        }}
      >
        <Input
          size="large"
          placeholder="Urun Ara..."
          prefix={<SearchOutlined />}
          className="rounded-full max-w-[800px]"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="menu-links">
        <Link to="/" className="menu-link">
          <HomeOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Anasayfa</span>
        </Link>

        <Link to="/cart" className="menu-link ">
          <Badge count={cart.cartItems.length} offset={[0, 0]}>
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
          </Badge>
          <span className="md:text-xs text-[10px]">Sepet</span>
        </Link>
        <Link to="/bills" className="menu-link">
          <CopyOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Faturalar</span>
        </Link>
        <Link to="/customers" className="menu-link ">
          <UserOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Musteriler</span>
        </Link>
        <Link to="/statistic" className="menu-link ">
          <BarChartOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Istatistik</span>
        </Link>
        <div onClick={logOut}>
          <Link className="menu-link ">
            <LogoutOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Cikis</span>
          </Link>
        </div>
      </div>
      <Link
        to={"/"}
        className="menu-link  flex-col hover:text-[#40a9ff] transition-all md:hidden flex"
      >
        <Badge count={cart.cartItems.length} offset={[0, 0]}>
          <ShoppingCartOutlined className="text-2xl " />
        </Badge>

        <span className="md:text-xs text-[10px]">Sepet</span>
      </Link>
    </header>
  );
};

export default Header;
