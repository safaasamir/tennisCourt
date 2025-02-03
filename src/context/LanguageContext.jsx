import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });
  const [loading, setLoading] = useState(false);
  const toggleLanguage = () => {
    setLoading(true);
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === "en" ? "ar" : "en";
      localStorage.setItem("language", newLanguage);
      window.location.reload();
      return newLanguage;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
