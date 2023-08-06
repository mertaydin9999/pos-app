import React from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      message.success("Urunler başarıyla eklendi");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Urun Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
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
          rules={[{ required: true, message: "Urun gorseli boş bırakılamaz" }]}
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
            Olustur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
