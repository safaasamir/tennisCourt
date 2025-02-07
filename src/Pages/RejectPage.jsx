import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const RejectPage = () => {
  const { language } = useLanguage();

  const heading = language === "ar" ? "عملية الدفع فشلت" : "Payment Failed";
  const message =
    language === "ar"
      ? "نعتذر، حدث خطأ أثناء محاولة الدفع. يرجى المحاولة مرة أخرى أو التواصل مع الدعم."
      : "Sorry, there was an error processing your payment. Please try again or contact support.";
  const buttonText =
    language === "ar" ? "العودة لتفاصيل الطلب" : "return to order details";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-5 md:px-0"
      style={{ backgroundImage: "url('./error.webp')" }}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg relative z-10 ">
        <div className="text-9xl font-bold text-red-600 mb-4 flex justify-center">
          <img className="w-32" src="./error2.png" alt="Error Icon" />
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-5">
          {heading}
        </h1>
        <p className="text-lg text-gray-600 mb-8">{message}</p>
        <Link
          to="/orderDetails"
          className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:opacity-70 transition-colors duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default RejectPage;
