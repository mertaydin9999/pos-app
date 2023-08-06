import { useState , useEffect} from "react";
import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tumu");
  useEffect(() => {
    if (categoryTitle === "Tumu") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((product) => product.category === categoryTitle)
      );
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      {categories.map((category) => (
        <li
          className={`category-item ${
            category.title === categoryTitle && "!bg-pink-700"
          } `}
          key={category._id}
          onClick={() => setCategoryTitle(category.title)}
        >
          <span>{category.title}</span>
        </li>
      ))}
      <li
        className="category-item !bg-purple-800 hover:opacity-90 "
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li
        className="category-item !bg-orange-800 hover:opacity-90 "
        onClick={() => setIsEditModalOpen(true)}
      >
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
