import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Giris Basarili");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanici Bulunamadi");
      } else if (res.status === 403) {
        message.error("Sifre Yanlis");
      }
      setLoading(false);
    } catch (error) {
      message.error("Kayit Basarisiz");
      setLoading(false);
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 flex flex-col h-full justify-center w-full relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: true,
            }}
          >
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
            <Form.Item name="remember" valuePropName="checked">
              <div className="flex justify-between">
                <Checkbox>Beni Hatirla</Checkbox>
                <Link>Sifremi Unuttum</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Giris Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henuz bir hesabiniz yok mu?
            <Link className="text-blue-600 " to="/register">
              Hemen Kaydol
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

export default Login;
