import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';


const ThanksPage = () => {
  const { language } = useLanguage(); 

  
  
  const heading = language === "ar" ? " ! شكرا لك " : "Thank You ! ";
  const message = language === "ar" 
    ? "شكرًا لتسجيلك لحجز ملعب تنس! نقدر اهتمامك ونتطلع لرؤيتك في الملعب قريبًا!" 
    : "Thank you for registering to book a tennis court! We appreciate your interest and look forward to seeing you on the court soon!.";
  const buttonText = language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Go Back Home";

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat px-5 md:px-0"
      style={{ backgroundImage: "url('./Thanks.avif')" }} 
    >
      <div className='absolute inset-0 bg-gray-500 opacity-50'></div>
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg relative z-10 ">
        <div className="text-9xl font-bold text-thirdColor mb-4 flex justify-center"><img className='w-32' src="./check.png"/></div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-thirdColor to-thirdColor mb-5">{heading}</h1>
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

export default ThanksPage;
