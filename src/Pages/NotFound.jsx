import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { language } = useLanguage();

  const title = language === "ar" ? "404" : "404";
  const heading =
    language === "ar" ? "عذرًا! الصفحة غير موجودة" : "Oops! Page Not Found";
  const message =
    language === "ar"
      ? "يبدو أن الصفحة التي تبحث عنها قد ذهبت في مغامرة صغيرة. لا تقلق، سنساعدك في العثور على طريق العودة إلى المنزل."
      : "The page you're looking for seems to have gone on a little adventure. Don't worry, we'll help you find your way back home.";
  const buttonText =
    language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Go Back Home";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-5 md:px-0"
      style={{ backgroundImage: "url('./notfound.jpg')" }}
    >
      <div className="absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg relative z-10 ">
        <div className="text-9xl font-bold text-thirdColor mb-4">{title}</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{heading}</h1>
        <p className="text-lg text-gray-600 mb-8">{message}</p>
        <Link
          to="/"
          className="inline-block bg-thirdColor text-white font-semibold px-6 py-3 rounded-md hover:opacity-50 transition-colors duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
