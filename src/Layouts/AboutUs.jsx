import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";
function AboutUs() {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="md:container md:mx-auto   md:max-w-screen-2xl md:px-8"
      id="about"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <h2 className="font-bold text-3xl text-thirdColor text-center mb-10 mt-20 drop-shadow-lg">
        {language === "ar" ? "من نحن" : "WHO WE ARE"}
      </h2>
      <div className="flex flex-col lg:flex-row gap-x-14 p-10 ">
        <div className="w-full lg:w-[460px] mb-5 lg:mb-0">
          <img
            className="w-full rounded-lg shadow-xl object-cover"
            src="/aboutustennis.jpg"
            alt="Tennis Academy"
          />
        </div>
        <div
          className={`w-full lg:w-[50%] leading-relaxed ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <h2 className="font-bold text-thirdColor text-2xl mb-2 text-center md:text-start">
            {language === "ar"
              ? "مرحبًا بكم في أكاديمية 7 للتنس – حيث يلعب الأبطال!"
              : "Welcome to 7 Tennis Academy – Where Champions Play!"}
          </h2>
          <p
            className={`transition-all duration-300 ${
              expanded ? "max-h-full" : "max-h-24 overflow-hidden"
            } md:max-h-full`}
          >
            {language === "ar"
              ? "مرحبًا بكم في [اسم أكاديميتك]، الوجهة الرائدة لمحبي التنس من جميع الأعمار والمستويات. تقع الأكاديمية في قلب [اسم المدينة/المنطقة]، وتكرّس جهودها لتقديم أفضل الملاعب، والتدريب المتخصص، ومجتمع نابض بالحياة يشارك في شغف التنس. سواء كنت مبتدئًا تتطلع لتعلم الأساسيات أو لاعبًا متقدمًا تسعى لتحسين مهاراتك، نحن نقدم لك المرافق والبرامج والدعم الشخصي لتحقيق أقصى إمكانياتك. في [اسم أكاديميتك]، نؤمن بأن التنس هو أكثر من مجرد رياضة - إنه وسيلة لبناء الثقة واللياقة والصداقة طويلة الأمد. ملاعبنا المتطورة، ومدربونا المهرة، وجلسات التدريب الديناميكية لدينا مصممة لضمان تجربة إيجابية وتحدٍ ممتع لكل لاعب. انضم إلينا لتتدرب كالمحترفين وتتنافس مع الأفضل وتكون جزءًا من مجتمع التنس الذي يدعم التميز والروح الرياضية."
              : "Welcome to [Your Academy's Name], the premier destination for tennis enthusiasts of all ages and skill levels. Located at the heart of [City/Region Name], our academy is dedicated to providing top-quality courts, expert coaching, and a vibrant community that shares a passion for tennis. Whether you're a beginner looking to learn the basics or an advanced player aiming to perfect your game, we have the facilities, programs, and personalized support to help you reach your full potential. At [Your Academy's Name], we believe that tennis is more than just a sport – it’s a way of building confidence, fitness, and lifelong friendships. Our state-of-the-art courts, skilled trainers, and dynamic training sessions are designed to ensure every player has a positive, challenging, and fun experience. Join us to train like a pro, compete with the best, and be part of a tennis community that champions excellence and sportsmanship."}
          </p>

          <button
            className="flex items-center gap-1 text-blue-500 font-semibold mt-2 md:hidden"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                {language === "ar" ? "إخفاء" : "Show Less"}{" "}
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                {language === "ar" ? "عرض المزيد" : "Show More"}{" "}
                <ChevronDown size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
