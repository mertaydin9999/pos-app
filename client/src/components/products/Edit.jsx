import { Modal, Form, Table, Input, Button, message, Select } from "antd";
import React, { useState, useEffect } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

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
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  const onFinish = (values) => {
    try {
      fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/products/update-product",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ...values, productId: editingItem._id }),
        }
      );
      message.success("Urun basariyla guncellendi");
      setProducts(
        products.map((product) => {
          if (product._id === editingItem._id) {
            return values;
          }
          return product;
        })
      );
    } catch (error) {
      message.error("Urun guncellenirken bir hata olustu");
    }
  };
  const deleteProduct = async (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        await fetch(
          import.meta.env.VITE_APP_SERVER_URL + "/api/products/delete-product",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ productId: id }),
          }
        );
        message.success("Urun basariyla silindi");
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        message.error("Urun silinirken bir hata olustu");
      }
    }
  };

  const columns = [
    {
      title: "Urun Adi",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Urun Gorseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return <img src={record.img} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Urun Fiyati",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditingItem(record);
              }}
            >
              Duzenle
            </Button>
            <Button type="text" onClick={() => deleteProduct(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Urun Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
          <Form.Item
            name="title"
            label="Urun Adi"
            rules={[{ required: true, message: "Urun adı boş bırakılamaz" }]}
          >
            <Input placeholder="Bir Urun adi giriniz" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Urun Gorseli"
            rules={[
              { required: true, message: "Urun gorseli boş bırakılamaz" },
            ]}
          >
            <Input placeholder="Bir Urun gorseli giriniz" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Urun Fiyati"
            rules={[{ required: true, message: "Urun fiyati boş bırakılamaz" }]}
          >
            <Input placeholder="Bir Urun fiyati giriniz" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Sec"
            rules={[{ required: true, message: "Kategori boş bırakılamaz" }]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item
            className="flex justify-end mb-0"
            rules={[{ required: true }]}
          >
            <Button type="primary" htmlType="submit">
              Guncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
