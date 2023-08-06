import { useRef } from "react";
import { Modal, Button } from "antd";
import { useReactToPrint } from "react-to-print";
const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      title=" Fatura Yazdir"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayi:</p>
                  <p>Fake Street 123</p>
                  <p>San Javier</p>
                  <p>CA 1234 </p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura </p>
                  <p>The Boring Company</p>
                  <p>Tesla Street 007</p>
                  <p>CA 0000</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Fatura Numarasi:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Tarih:</p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700 ">Sartlar:</p>
                    <p>0 gun</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Vade:</p>
                    <p>2023-11-22</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Gorsel
                    </th>
                    <th
                      scope="col"
                      className=" py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Baslik
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className=" py-3.5  text-left text-sm font-normal text-slate-700  md:pl-0 sm:hidden"
                    >
                      Baslik
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden "
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-center text-sm font-normal text-slate-700  md:pl-0 sm:table-cell hidden"
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5  text-end text-sm font-normal text-slate-700  md:pl-0 "
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr
                      className="border-b border-t border-slate-200"
                      key={item._id}
                    >
                      <td className="py-4 sm:table-cell hidden ">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium ">{item.title}</span>
                          <span className="text-xs sm:hidden inline-block ">
                            Birim Fiyati
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium ">Salgam</span>
                          <span className="text-xs sm:hidden inline-block ">
                            Birim Fiyati {item.price} TL
                          </span>
                        </div>
                      </td>
                      <td className="py-4  text-center sm:table-cell hidden">
                        <span>{item.price} TL</span>
                      </td>
                      <td className="py-4  sm:text-center text-right  sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4  text-end ">
                        <span>
                          {(item.price * item.quantity).toFixed(2)} TL
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="">
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700 ">
                        Ara Toplam
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <span className="font-normal text-slate-700 ">
                        Ara Toplam
                      </span>
                    </th>
                    <th className="text-right pt-4 " scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal?.toFixed(2)} TL
                      </span>
                    </th>
                  </tr>
                  <tr className="">
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700 ">KDV</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <span className="font-normal text-slate-700 ">KDV</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +{customer?.tax.toFixed(2)} TL
                      </span>
                    </th>
                  </tr>
                  <tr className="">
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700 ">Total</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <span className="font-normal text-slate-700 ">Total</span>
                    </th>
                    <th className="text-right pt-4 " scope="row">
                      <span className="font-normal text-slate-700 ">
                        {customer?.totalAmount} TL
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light  text-slate-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aperiam dolorum quam praesentium? Distinctio dignissimos,
                    suscipit sint, sit assumenda nulla maiores molestiae
                    laboriosam dicta corporis at magnam voluptas minima est
                    voluptate. Vel perspiciatis impedit in maxime reprehenderit
                    reiciendis dolores labore quod, quis delectus modi veniam
                    asperiores cumque, et a qui sint nam ea numquam, temporibus
                    est repellendus cum excepturi laboriosam! Nisi? Laborum
                    magni, modi necessitatibus culpa delectus debitis, ipsum
                    quia sed, quibusdam maxime nobis aut sapiente illo nesciunt
                    beatae sint voluptas dicta! Perferendis, aut. Iste
                    architecto nulla, nobis fugiat molestias enim.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Yazdir
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
