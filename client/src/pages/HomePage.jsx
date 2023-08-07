import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await response.json();
        data &&
          setCategories(
            data.map((item) => {
              return {
                ...item,
                value: item.title,
              };
            })
          );

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex flex-col md:flex-row justify-between gap-10 md:pb-0 pb-24">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin size="large" className="absolute top-1/3 left-1/2" />
      )}
    </>
  );
};

export default HomePage;
