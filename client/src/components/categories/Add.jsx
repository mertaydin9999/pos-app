import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/categories/add-category",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json;charset=utf-8" },
        }
      );
      message.success("Kategori başarıyla eklendi");
      form.resetFields();
      setCategories([
        ...categories,
        {
          _id: Math.random(),
          title: values.title,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Kategori Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Kategori Ekle"
          rules={[{ required: true, message: "Kategori adı boş bırakılamaz" }]}
        >
          <Input />
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
