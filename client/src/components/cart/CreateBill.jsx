import { Modal, Form, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: cart.total * cart.tax,
            totalAmount: (cart.total + cart.total * cart.tax).toFixed(2),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      if (res.status === 200) {
        message.success("Siparisiniz basariyla olusturuldu.");
        dispatch(resetCart());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Siparisiniz  olusturululamadi.");
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Fatura Olustur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Musteri Adi"
          name="customerName"
          rules={[{ required: true, message: "Musteri Alani Bos Gecilemez" }]}
        >
          <Input placeholder="Bir Musteri Adi Yaziniz" />
        </Form.Item>
        <Form.Item
          label="Telefon Numarasi"
          rules={[{ required: true }]}
          name="customerPhoneNumber"
        >
          <Input placeholder="Telefon Numarasi yaziniz" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Odeme Yontemi"
          rules={[{ required: true }]}
          name="paymentMode"
        >
          <Select placeholder="Odeme Yontemi Seciniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Karti">Kredi Karti</Select.Option>
          </Select>
        </Form.Item>

        <Card>
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
          <div className="flex justify-end">
            <Button
              className="mt-4  "
              type="primary"
              size="large"
              onClick={() => setIsModalOpen(false)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Siparis Olustur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
