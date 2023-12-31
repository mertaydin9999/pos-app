import { useState, useRef } from "react";
import Header from "../components/header/Header";
import { Table, Card, Button, message, Input, Space } from "antd";
import CreateBill from "../components/cart/CreateBill";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} from "../redux/cartSlice";
import Highlighter from "react-highlight-words";

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Urun Gorseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (img) => {
        return <img src={img} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Urun Adi",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Kategory",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Urun Fiyati",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return <span>{price.toFixed(2)} tl</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Urun Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-2 ">
            <Button
              onClick={() => dispatch(increaseQuantity(record))}
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full bg-blue-600"
              icon={<PlusCircleOutlined />}
            />
            <span className="font-bold"> {record.quantity}</span>
            <Button
              onClick={() => {
                if (record.quantity === 1) {
                  if (
                    window.confirm("Urunu silmek istediginize emin misiniz?")
                  ) {
                    dispatch(decreaseQuantity(record));
                    message.success("Urun silindi.");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decreaseQuantity(record));
                }
              }}
              type="primary"
              size="small"
              className="w-full  flex items-center justify-center !rounded-full bg-blue-600"
              icon={<MinusCircleOutlined />}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)} tl</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Button
            type="link"
            danger
            onClick={() => {
              dispatch(deleteCart(record));
              message.success("Urun silindi.");
            }}
          >
            sil
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{ x: 1200, y: 300 }}
        />

        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total} tl</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">
                +{(cart.total * cart.tax).toFixed(2)} tl
              </span>
            </div>
            <div className="flex justify-between">
              <b>Toplam</b>
              <b className="">{cart.total + cart.total * cart.tax} tl</b>
            </div>
            <Button
              className="mt-4 w-full"
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Siparis Olustur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
