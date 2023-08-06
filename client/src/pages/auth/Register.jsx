import { Form, Input, Button, Carousel, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useState } from "react";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 200) {
        message.success("Kayit Basarili");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Kayit Basarisiz");
      console.log(error);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col h-full justify-center w-full relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanici Adi"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Kullanici Adi Alani Bos birakilamaz",
                },
              ]}
            >
              <Input placeholder="Kullanici Adi giriniz" />
            </Form.Item>
            <Form.Item
              label="E-mail "
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email Alani Bos birakilamaz",
                },
              ]}
            >
              <Input placeholder="Email giriniz " />
            </Form.Item>
            <Form.Item
              label="Sifre "
              name="password"
              rules={[
                {
                  required: true,
                  message: "Sifre Alani Bos birakilamaz",
                },
              ]}
            >
              <Input.Password placeholder="Sifrenizi giriniz " />
            </Form.Item>
            <Form.Item
              label="Sifre (Tekrar)"
              name="passwordAgain"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Sifreler Ayni Olmali",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Sifreler Eslesmiyor. Lutfen Tekrar Deneyiniz")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Sifrenizi giriniz " />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
              loading={loading}
            >
              Kaydol
            </Button>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabiniz var mi?
            <Link className="text-blue-600 " to="/login">
              Simdi Giris Yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden  bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full" autoplay>
                <AuthCarousel
                  img="/images/responsive.svg"
                  title="Responsive"
                  description="Tum cihaz boyutllariyla uyumlu"
                />
                <AuthCarousel
                  img="/images/statistic.svg"
                  title="Istatistikler"
                  description="Genis Tutulan Istatistikler"
                />
                <AuthCarousel
                  img="/images/customer.svg"
                  title="Musteri Memnuniyeti"
                  description="Deneyim Sonunda Urunden Memnun Musteriler"
                />
                <AuthCarousel
                  img="/images/admin.svg"
                  title="Yonetici Paneli"
                  description="Tek Yerden Yonetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
