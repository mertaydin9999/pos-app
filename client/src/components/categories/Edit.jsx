import { Modal, Form, Table, Input, Button, message } from "antd";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState(null);

  const onFinish = (values) => {
    try {
      fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/categories/update-category",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        }
      );
      message.success("Kategori basariyla guncellendi");
      setCategories(
        categories.map((category) => {
          if (category._id === editingRow._id) {
            return { ...category, title: values.title };
          }
          return category;
        })
      );
    } catch (error) {
      message.error("Kategori guncellenirken bir hata olustu");
    }
  };
  const deleteCategory = async (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        await fetch(
          import.meta.env.VITE_APP_SERVER_URL +
            "/api/categories/delete-category",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ categoryId: id }),
          }
        );
        message.success("Kategori basariyla silindi");
        setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
        message.error("Kategori silinirken bir hata olustu");
      }
    }
  };

  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (_, record) => {
        return record._id === editingRow?._id ? (
          <Form.Item className="mb-0" name="title" initialValue={record.title}>
            <Input />
          </Form.Item>
        ) : (
          <p>{record.title}</p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditingRow(record)}>
              Duzenle
            </Button>
            <Button type="text" onClick={() => deleteCategory(record._id)}>
              Sil
            </Button>
            <Button type="text" htmlType="submit" danger>
              Kaydet
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={isEditModalOpen}
      title="Kategori Islemleri"
      footer={false}
      onCancel={() => setIsEditModalOpen(false)}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        ></Table>
      </Form>
    </Modal>
  );
};

export default Edit;
