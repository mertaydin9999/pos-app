import { Button, message } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  resetCart,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col ">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Urunler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems
              .map((item) => (
                <li className="cart-item flex justify-between" key={item._id}>
                  <div className="flex items-center">
                    <img
                      src={item.img}
                      onClick={() => {
                        dispatch(deleteCart(item));
                        message.success("Urun silindi.");
                      }}
                      alt=""
                      className="w-16 h-16 object-cover cursor-pointer"
                    />
                    <div className="flex flex-col ml-2">
                      <b>{item.title}</b>
                      <span>
                        {item.price}tl x {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 ">
                    <Button
                      onClick={() => dispatch(increaseQuantity(item))}
                      type="primary"
                      size="small"
                      className="w-full  flex items-center justify-center !rounded-full bg-blue-600"
                      icon={<PlusCircleOutlined />}
                    />
                    <span className="font-bold"> {item.quantity}</span>
                    <Button
                      onClick={() => {
                        if (item.quantity === 1) {
                          if (
                            window.confirm(
                              "Urunu silmek istediginize emin misiniz?"
                            )
                          ) {
                            dispatch(decreaseQuantity(item));
                            message.success("Urun silindi.");
                          }
                        }
                        if (item.quantity > 1) {
                          dispatch(decreaseQuantity(item));
                        }
                      }}
                      type="primary"
                      size="small"
                      className="w-full  flex items-center justify-center !rounded-full bg-blue-600"
                      icon={<MinusCircleOutlined />}
                    />
                  </div>
                </li>
              ))
              .reverse()
          : "Sepetinizde urun bulunmamaktadir."}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total} TL</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              +{(cart.total * cart.tax).toFixed(2)}TL
            </span>
          </div>
        </div>
        <div className=" border-b mt-4 ">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + cart.total * cart.tax}TL
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            disabled={cart.cartItems.length === 0}
            type="primary"
            size="large"
            className="w-full mt-2 bg-blue-600"
            onClick={() => navigate("/cart")}
          >
            Siparis Olustur
          </Button>
          <Button
            onClick={() => {
              if (
                window.confirm("Sepeti temizlemek istediginize emin misiniz?")
              ) {
                dispatch(resetCart());
                message.success("Sepet temizlendi.");
              }
            }}
            disabled={cart.cartItems.length === 0}
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
