import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import { useEffect } from "react";
import Form from "./Form";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function SliderImage(props) {
  const { language } = useLanguage();
  const {
    slides,
    currentIndex,
    prevSlide,
    nextSlide,
    goToSlide,
    form,
    setForm,
    errors,
    setErrors,
    courts,
    open,
    setOpen,
    formCourtsDate,
    chooseDate,
    setChooseDate,
    handleButtonClick,
    selectLoading,
    setSelectedDay,
  } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);

  return (
    <div
      className="max-w-[100wh] h-[100vh] md:h-[100vh] w-full  relative group"
      id="slide"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className=" w-full h-full  bg-center bg-cover duration-500 flex items-center justify-center lg:justify-end "
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {
          <div className="  flex justify-center xl:justify-end  lg:me-20  ">
            <Form
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
              courts={courts}
              handleButtonClick={handleButtonClick}
              formCourtsDate={formCourtsDate}
              chooseDate={chooseDate}
              setChooseDate={setChooseDate}
              open={open}
              setOpen={setOpen}
              selectLoading={selectLoading}
              setSelectedDay={setSelectedDay}
              slides={slides}
            />
          </div>
        }
        <div
          className="absolute z-20 flex-col items-start justify-center p-5 inset-0 hidden 2xl:flex"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <h1
            className={`text-secondryTextColor font-bold text-5xl mb-4   ${
              language === "ar" ? "ps-16" : "ps-10"
            }`}
          >
            {language === "ar"
              ? "مرحباً بكم في أكاديمية 7 للتنس!"
              : "Welcome to 7 Tennis Academy!"}
          </h1>
          <h3
            className={`text-secondryTextColor text-sm ${
              language === "ar" ? "ps-20" : "ps-12"
            }`}
          >
            {language === "ar"
              ? "التسجيل للبالغين مفتوح الآن!"
              : "Adult Registration is Now Open!"}
          </h3>
          <h3
            className={`text-secondryTextColor text-center text-sm ${
              language === "ar" ? "ps-20" : "ps-12"
            }`}
          >
            {language === "ar"
              ? "هنا، يمكنك استكشاف أفضل الملاعب لدينا وحجز المفضل لديك. 🎾"
              : "Here, you can explore our top courts and book your favorite one. 🎾"}
          </h3>
          <a
            href="#courts"
            className="bg-mainColor xl:ms-20 text-mainTextColor w-50 mt-5 font-bold shadow-xl hover:opacity-70 p-3 rounded-md"
          >
            {language === "ar"
              ? "اعثر على ملعبنا الآن!"
              : "Find Our Court Now!"}
          </a>
        </div>
      </div>
      <div className="hidden md:group-hover:block  absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-30">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      <div className=" hidden md:group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-30">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      <div className=" relative flex translate-y-[-50px] justify-center  z-10">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => {
              goToSlide(slideIndex);
            }}
            className={`text-4xl cursor-pointer ${
              slideIndex === currentIndex
                ? "text-mainTextColor"
                : "text-thirdColor"
            }`}
          >
            <Dot />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderImage;
