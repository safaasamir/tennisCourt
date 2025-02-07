import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function OrderDetailsPage() {
  const [data, setData] = useState(null);
  const [Mydata, MysetData] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));

    const transformedData = {
      name: formData?.name,
      email: formData?.email,
      phone: formData?.mobilePhone,
      slots: formData?.courtSections.map((section) => ({
        court_id: section?.court,
        date: section?.date,
        from: section?.time.split("-")[0],
        to: section?.time.split("-")[1],
      })),
    };

    setData(transformedData);
  }, []);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    MysetData(formData);
    const totalAmount = formData?.courtSections.reduce(
      (sum, slot) => sum + parseFloat(slot?.price),
      0
    );
    setTotal(totalAmount);
  }, []);
  const handleCompleteReservation = async () => {
    if (!data) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://185.175.208.7/api/timeslots/reserve",
        data
      );

      setOrder(response.data.data);
      if (response.status === 200) {
        window.location.href = response?.data?.data?.iframe_url;
      }
    } catch (error) {
      console.error("Error completing reservation:", error);
      Swal.fire({
        icon: "error",
        title:
          language === "ar"
            ? "حدث خطأ أثناء الحجز!"
            : "An error occurred while reserving!",
        text:
          language === "ar"
            ? "الخادم مشغول، حاول لاحقاً!"
            : "The server is busy, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!data)
    return (
      <div className="h-[600px] flex items-center justify-center">
        <img src="./spinner.gif" width="150px" />
      </div>
    );
  
  return (
    <>
      {data?.email && data?.phone && data?.slots.length > 0 ? (
        <div
          className={`bg-slate-50 min-h-screen  ${
            language === "ar" ? "text-right" : "text-left"
          }`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <section className="container mx-auto p-4 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5">
              <h1 className="text-2xl font-bold text-thirdColor">
                {language === "ar" ? "تأكيد الحجز" : "Reservation Confirmation"}
              </h1>

              <span className="text-lg hidden md:block">
                {language === "ar" ? "إجمالي الحجز: " : "Reservation Total: "}
                <span className="font-bold text-2xl text-thirdColor">
                  {language === "ar" ? `${total} جنيه` : ` ${total}EGP`}
                </span>
              </span>

              <button
                onClick={handleCompleteReservation}
                disabled={loading}
                className="hidden md:block shadow-xl hover:opacity-70 p-3 rounded-md bg-mainColor text-mainTextColor font-bold text-lg md:text-xl text-center w-72"
              >
                {loading
                  ? language === "ar"
                    ? "جاري الحجز..."
                    : "Reserving..."
                  : language === "ar"
                  ? "إكمل الحجز"
                  : "Complete Reservation"}
              </button>
            </div>

            <section className="bg-secondryTextColor w-full p-5 mt-6 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div>
                  <h2 className="font-bold text-xl mb-2">
                    {language === "ar" ? "معلوماتك" : "Your Information"}
                  </h2>
                  <hr className="mb-4" />
                  <div className="text-lg space-y-2">
                    <p className="font-bold">
                      {language === "ar" ? "الاسم: " : "Name: "}
                      <span className="font-normal">{data?.name}</span>
                    </p>
                    <p className="font-bold">
                      {language === "ar" ? "الهاتف: " : "Phone: "}
                      <span className="font-normal">{data?.phone}</span>
                    </p>
                    <p className="font-bold">
                      {language === "ar" ? "البريد الإلكتروني: " : "Email: "}
                      <span className="font-normal">{data?.email}</span>
                    </p>
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="font-bold text-xl mb-2 text-start md:text-center">
                    {language === "ar" ? "طريقة الدفع" : "Payment Method"}
                  </h2>
                  <hr className="mb-4" />
                  <div className="flex justify-center">
                    <img
                      src="./paymop.png"
                      className="w-24 md:w-32"
                      alt="Paymop Logo"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full p-5 mt-10 md:mt-20">
              <div className="hidden grid-cols-5 gap-4 font-bold md:grid">
                <span>{language === "ar" ? "الملعب" : "Court"}</span>
                <span>{language === "ar" ? "اسم الملعب " : "Court Name"}</span>
                <span>{language === "ar" ? "التاريخ" : "Date"}</span>
                <span>{language === "ar" ? "الوقت" : "Time"}</span>
                <span>{language === "ar" ? "السعر" : "Price"}</span>
              </div>
              <hr className="mt-4 hidden md:block" />

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 items-center">
                {Mydata?.courtSections?.map((slot, index) => (
                  <React.Fragment key={index}>
                    <div className="md:col-span-1 flex justify-center md:justify-start">
                      <img
                        className="w-full h-full lg:w-32 lg:h-24 rounded-md"
                        src={slot?.cover_image || "./aboutustennis.jpg"}
                        alt="Court"
                      />
                    </div>
                    <div className="md:hidden ms-5">
                      <div className="flex gap-x-2">
                        <span className="font-bold text-xl">
                          {language === "ar" ? "الاسم:" : "Name:"}
                        </span>
                        <p className="md:col-span-1 text-lg">
                          {slot?.courtName}
                        </p>
                      </div>
                      <div className="flex gap-x-2 text-xl">
                        <span className="font-bold">
                          {language === "ar" ? "التاريخ:" : "Date:"}
                        </span>
                        <p className="md:col-span-1 text-lg">{slot?.date}</p>
                      </div>
                      <div className="flex gap-x-2 text-xl">
                        <span className="font-bold">
                          {language === "ar" ? "الوقت:" : "Time:"}
                        </span>
                        <p className="md:col-span-1 text-lg">{slot?.time}</p>
                      </div>
                      <div className="flex gap-x-2 text-xl">
                        <span className="font-bold">
                          {language === "ar" ? "السعر:" : "Price:"}
                        </span>
                        <p className="md:col-span-1 text-lg">{slot?.price}</p>
                      </div>
                    </div>

                    <p className="md:col-span-1 hidden md:block">
                      {slot.courtName}
                    </p>
                    <p className="md:col-span-1 hidden md:block">
                      {slot?.date}
                    </p>
                    <p className="md:col-span-1 hidden md:block">
                      {slot?.time}
                    </p>
                    <p className="md:col-span-1 hidden md:block">
                      {slot?.price}
                    </p>

                    <hr className="col-span-1 md:col-span-5 my-2" />
                  </React.Fragment>
                ))}
              </div>

              <div className="md:hidden w-full mt-5">
                <span className="text-lg font-bold ms-2">
                  {language === "ar" ? "إجمالي الحجز: " : "Reservation Total: "}
                  <span className="font-bold text-2xl text-thirdColor">
                    {language === "ar" ? ` جنيه${total}` : ` ${total}EGP`}
                  </span>
                </span>
                <button
                  onClick={handleCompleteReservation}
                  disabled={loading}
                  className="w-full my-5 shadow-xl hover:opacity-70 p-3 rounded-md bg-mainColor text-mainTextColor font-bold text-lg md:text-xl text-center"
                >
                  {loading
                    ? language === "ar"
                      ? "جاري الحجز..."
                      : "Reserving..."
                    : language === "ar"
                    ? "إكمال الحجز"
                    : "Complete Reservation"}
                </button>
              </div>
            </section>
          </section>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[500px] md:h-[600px]">
          <img src="./nodata.jpg" alt="not found   md:w-[300px]" />
        </div>
      )}
    </>
  );
}

export default OrderDetailsPage;
