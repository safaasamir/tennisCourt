import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Globe } from "lucide-react";

function Header() {
  const { language, toggleLanguage,loading } = useLanguage();

  return (
    <div
      className={`navbar h-20 bg-transparent relative z-30 text-mainTextColor font-bricolage-grotesque ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu-sm dropdown-content bg-mainColor rounded-box z-[1] w-52"
          >
            <li className="hover:text-secondryTextColor font-bold text-2xl">
              <Link className="cursor-pointer" to="/" duration={800}>
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
            </li>
            <li className="hover:text-secondryTextColor font-bold text-2xl">
              <Link
                to="/"
                onClick={() => {
                  
                  setTimeout(() => {
                    const aboutSection = document.getElementById("about");
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100); 
                }}
                className="cursor-pointer"
              >
                {language === "ar" ? "أعرف عنا" : "About"}
              </Link>
            </li>
          </ul>
        </div>
        <Link to={"#"} className="ps-5 w-44 pb-5">
          <img src="./logo.png" alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="gap-x-14 menu-horizontal px-1 text-2xl font-bold">
          <li className="hover:text-thirdColor">
            <Link className="cursor-pointer" to="/" duration={500}>
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
          </li>
          <li className="hover:text-thirdColor">
            <Link
              to="/"
              onClick={() => {
                
                setTimeout(() => {
                  const aboutSection = document.getElementById("about");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  }
                }, 100); 
              }}
              className="cursor-pointer"
            >
              {language === "ar" ? "أعرف عنا" : "About"}
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end pr-5">
        <button
          onClick={toggleLanguage}
          disabled={loading}
          className="btn hover:bg-mainColor border-mainColor rounded-lg text-mainTextColor bg-transparent font-bold p-2 w-32"
        >

        {loading ? (
          <span className="flex items-center gap-3">......</span>  
        ) : (
          language === "ar" ? (
            <span className="flex items-center gap-3 font-bold">
              <span>English</span>
              <Globe />{" "}
            </span>
          ) : (
            <span className="flex items-center gap-3 font-bold ">
              <span>عربي</span>
              <Globe />
            </span>
          )
        )}
          
        </button>
      </div>
    </div>
  );
}

export default Header;
