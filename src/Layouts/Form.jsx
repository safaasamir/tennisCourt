import React, { useState } from "react";
import Input from "../Components/Input";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../utils/validation/FormSchema";
import * as Yup from "yup";
import { useLanguage } from "../context/LanguageContext";

const Form = React.memo(
  ({
    form,
    setForm,
    errors,
    setErrors,
    courts,
    formCourtsDate,
    chooseDate,
    setChooseDate,
    open,
    setOpen,
    handleButtonClick,
    selectLoading,
    setSelectedDay,
    slides,
    setGridCourtformTimeandDate,
    setFormCourtsDate
  }) => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const handleChange = (e) => {
      const { name, value } = e.target;

      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    const handleBlur = async (e) => {
      const { name, value } = e.target;
      try {
        await validationSchema(language).validateAt(name, { [name]: value });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error.message,
          }));
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      try {
        await validationSchema(language).validate(form, { abortEarly: false });
        localStorage.setItem("formData", JSON.stringify(form));
        navigate("/orderDetails");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = {};
          error.inner.forEach((err) => {
            validationErrors[err.path] = err.message;
          });

          setErrors(validationErrors);
        }
      }
      console.log(errors);
    };

    return (
      <div
        className={`${
          errors.name || errors.email || errors.mobilePhone
            ? "h-[650px] md:h-[480px]"
            : "h-[600px] md:h-[420px]"
        } mx-5 w-[350px] md:w-[560px] rounded-md lg:overflow-hidden relative z-30 font-bricolage-grotesque overflow-auto`}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 bg-mainTextColor opacity-50"></div>
        <div className="relative flex flex-col p-5 h-full overflow-y-auto">
          <h2 className="text-start md:text-center mb-4 font-bold text-2xl text-secondryTextColor">
            {language === "ar"
              ? "اكتشف واحجز ملاعب التنس عالية الجودة بسهولة مع   7Tennis acadimy"
              : "Discover and book top-quality tennis courts effortlessly with 7 Tennis Academy"}
          </h2>
          <div className="bg-secondryTextColor p-5 flex flex-col items-start rounded-xl">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="w-full md:flex md:justify-between gap-x-5">
                <Input
                  name="name"
                  label={language === "ar" ? "الاسم" : "Name"}
                  placeholder={language === "ar" ? "الاسم" : "Name"}
                  value={form?.name}
                  onChange={handleChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                  }
                  errors={errors.name}
                  onBlur={handleBlur}
                />
                <Input
                  name="mobilePhone"
                  label={
                    language === "ar" ? "رقم الهاتف المحمول" : "Mobile Phone"
                  }
                  placeholder={
                    language === "ar" ? "رقم الهاتف المحمول" : "Mobile Phone"
                  }
                  value={form?.mobilePhone}
                  onChange={handleChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  }
                  errors={errors.mobilePhone}
                  onBlur={handleBlur}
                />
              </div>
              <div className="w-full md:flex md:justify-between gap-x-5">
                <Input
                  name="email"
                  label={language === "ar" ? "البريد الإلكتروني" : "Email"}
                  placeholder={
                    language === "ar" ? "البريد الإلكتروني" : "Email"
                  }
                  value={form?.email}
                  onChange={handleChange}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2-8 5-8-5h16zm-16 2.25 7.28 4.55c.27.17.6.17.86 0L20 8.25V18H4V8.25z" />
                    </svg>
                  }
                  errors={errors.email}
                  onBlur={handleBlur}
                />
              </div>

              <div className="flex mb-3 items-center justify-between w-full">
                <Modal
                  open={open}
                  onClose={() => {
                    setOpen(false);
                    setChooseDate("");
                    setSelectedDay("");
                    setFormCourtsDate([]);
                    setGridCourtformTimeandDate({});
                  }}
                  setForm={setForm}
                  form={form}
                  errors={errors}
                  setErrors={setErrors}
                  courts={courts}
                  formCourtsDate={formCourtsDate}
                  chooseDate={chooseDate}
                  setChooseDate={setChooseDate}
                  selectLoading={selectLoading}
                  setSelectedDay={setSelectedDay}
                  slides={slides}
                />
              </div>
              <div className="flex justify-center items-center">
                {!open && (
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="hover:opacity-70 p-3 rounded-md hover:cursor-pointer bg-mainColor text-mainTextColor font-bold text-xl text-center w-full"
                  >
                    {language === "ar"
                      ? "اختر حجزك"
                      : "Select Your Reservation"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
);

export default Form;
