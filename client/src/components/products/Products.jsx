import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid gap-4 grid-cols-card">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex items-center justify-center hover:opacity-90 min-h-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl " />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex items-center justify-center hover:opacity-90"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white md:text-2xl " />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
