import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { language } = useLanguage();

  const copyrightText =
    language === "ar"
      ? `حقوق الطبع والنشر © ${new Date().getFullYear()} - جميع الحقوق محفوظة 7 أكاديمية التنس`
      : `Copyright © ${new Date().getFullYear()} - All rights reserved by 7 Tennis Academy`;

  return (
    <footer className="footer footer-center bg-thirdColor text-thirdTextColor rounded p-10 ">
      <nav>
        <Link
          to={"#"}
          className=" w-32 h-20 bg-white flex justify-center items-center rounded-full  "
        >
          <img src="/logo.png" />
        </Link>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to="https://www.instagram.com/7tennisacademy/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </Link>
          <Link to="https://www.facebook.com/7courtstennis/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </Link>
        </div>
      </nav>
      <aside>
        <p>{copyrightText}</p>
      </aside>
    </footer>
  );
}

export default Footer;
