import { useState } from "react";
import Header from "../components/Header/Header";
import { Table, Card, Button } from "antd";
import StatisticCard from "../components/statistics/StatisticCard";

const StatisticPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Istatistikler</h1>
        <div className="statistic-section">
          <h2 className="text-xl">
            Hosgeldin{" "}
            <span className="text-green-700 font-bold text-xl">
              {user.username}
            </span>{" "}
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2   my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Musteri"}
              amount={"10 "}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanc"}
              amount={"660 TL "}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satis"}
              amount={"6"}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Urun"}
              amount={"28"}
              img={"images/product.png"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default StatisticPage;
