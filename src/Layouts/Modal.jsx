import React, { useEffect } from "react";
import { X, CirclePlus } from "lucide-react";
import SelectComponent from "../Components/SelectInput";
import DateInput from "../Components/DateInput";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";

function Modal({
  open,
  onClose,
  form,
  setForm,
  errors,
  setErrors,
  courts,
  selectLoading,
  chooseDate,
  setChooseDate,
  formCourtsDate,
}) {
  const { language } = useLanguage();

  useEffect(() => {
    setForm({
      ...form,
      courtSections: [],
    });
  }, []);

  useEffect(() => {
    if (open) {
      const newChooseDate = form.courtSections.reduce((acc, section, index) => {
        if (section.date) {
          acc[index] = section.date;
        }
        return acc;
      }, {});

      setChooseDate(newChooseDate);
    }
  }, [open, form, setChooseDate]);

  const addCourtSection = () => {
    const newCourtSection = { court: "", date: "", time: "", price: "" };

    setForm({
      ...form,
      courtSections: [...form.courtSections, newCourtSection],
    });
  };

  const handleChangeCourtSection = (index, field, value) => {
    const updatedSections = [...form.courtSections];
    updatedSections[index][field] = value;

    if (field === "court") {
      const selectedCourt = courts.find((court) => court.id === value);
      if (selectedCourt) {
        updatedSections[index].price = selectedCourt.price;
        updatedSections[index].courtName = selectedCourt.name;
      }
    }

    if (field === "date") {
      updatedSections[index].time = "";

      setChooseDate({
        ...chooseDate,

        [index]: value,
      });
    }

    setForm({ ...form, courtSections: updatedSections });
  };

  const getAvailableTimes = (courtId, index) => {
    const courtData = formCourtsDate[index]?.find(
      (court) => court.court.id === courtId
    );
    if (courtData) {
      const availableSlots = courtData.slots;
      return availableSlots;
    }
    return [];
  };

  const handleBlurCourtSection = (index, field) => {
    const updatedErrors = { ...errors };
    const requiredMessage =
      language === "ar" ? "هذا الحقل مطلوب" : "This field is required";
    if (!form.courtSections[index][field]) {
      updatedErrors[`courtSections[${index}].${field}`] = requiredMessage;
    } else {
      delete updatedErrors[`courtSections[${index}].${field}`];
    }

    setErrors(updatedErrors);
  };

  const handleRemoveCourtSection = (indexToRemove) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-button",
        cancelButton: "swal-button",
      },

      didOpen: () => {
        const swalPopup = document.querySelector(".swal2-popup");
        if (swalPopup) {
          swalPopup.style.transform = "scale(0.8)";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setForm((prevForm) => {
          if (indexToRemove === 0 && prevForm.courtSections.length === 1) {
            return {
              ...prevForm,
              courtSections: [],
            };
          } else {
            return {
              ...prevForm,
              courtSections: prevForm.courtSections.filter(
                (_, index) => index !== indexToRemove
              ),
            };
          }
        });
      }
    });
  };

  const courtOptions = courts?.map((court) => ({
    value: court.id,
    label: court.name,
  }));
  const timeOptions = (courtId, index) => {
    const availableTimes = getAvailableTimes(courtId, index);
    return availableTimes.map((time) => ({
      value: `${time.from}-${time.to}`,
      label: `${time.from} - ${time.to}`,
    }));
  };

  return (
    <div
      onClick={onClose}
      className={` fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20 " : "invisible"
      }`}
    >
      <div className="bg-black opacity-85 absolute inset-0"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all mx-5 ${
          open
            ? "scale-100 opacity-100 duration-700"
            : "scale-100 opacity-0 duration-700"
        } w-full max-w-3xl sm:max-w-sm md:max-w-3xl`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-2 ${
            language === "ar" ? "left-2" : "right-2"
          } p-1 rounded-lg text-red-600 bg-white hover:bg-gray-50 hover:text-gray-800`}
        >
          <X />
        </button>
        <div className="w-full " dir={language === "ar" ? "rtl" : "ltr"}>
          <div className="text-center mx-auto my-2">
            <h3 className="text-lg font-black text-gray-800">
              {language === "ar"
                ? "اختر حجزًا واحدًا أو أكثر"
                : "Select one or more Reservation"}
            </h3>
          </div>

          {form.courtSections.map((section, index) => (
            <div
              key={index}
              className="relative border border-mainColor p-4 mb-5 rounded-md"
            >
              <button
                type="button"
                onClick={() => handleRemoveCourtSection(index)}
                className={`absolute top-1 ${
                  language === "ar" ? "left-2" : "right-2"
                } p-1 rounded-lg text-red-600 bg-white hover:bg-gray-50 hover:text-red-800`}
              >
                <X />
              </button>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center mt-8">
                <div className="col-span-2 md:col-span-3">
                  <SelectComponent
                    name={`courtSections[${index}].court`}
                    options={courtOptions}
                    label={language === "ar" ? "الملعب" : "Court"}
                    placeholder={language === "ar" ? "الملعب" : "Court"}
                    onChange={(selectedOption) =>
                      handleChangeCourtSection(
                        index,
                        "court",
                        selectedOption?.value || ""
                      )
                    }
                    onBlur={() => handleBlurCourtSection(index, "court")}
                    value={
                      section.court
                        ? courtOptions.find(
                            (option) => option.value === section.court
                          ) || null
                        : null
                    }
                    errors={errors[`courtSections[${index}].court`]}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  />
                </div>
                <span className={`text-right md:me-2`}>
                  {section.price
                    ? `${section.price} ${language === "ar" ? "جنيها" : "EGP"}`
                    : language === "ar"
                    ? "0 جنيه"
                    : "0 EGP"}
                </span>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between gap-4 md:gap-x-5 ">
                <DateInput
                  name={`courtSections[${index}].date`}
                  label={language === "ar" ? "التاريخ" : "Date"}
                  type="date"
                  placeholder={language === "ar" ? "التاريخ" : "Date"}
                  value={section.date}
                  errors={errors[`courtSections[${index}].date`]}
                  onChange={(date) =>
                    handleChangeCourtSection(
                      index,
                      "date",
                      format(date, "yyyy-MM-dd")
                    )
                  }
                  onBlur={() => handleBlurCourtSection(index, "date")}
                  icon={
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
                      className="lucide lucide-calendar"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  }
                />

                <SelectComponent
                  name={`courtSections[${index}].time`}
                  label={language === "ar" ? "الوقت" : "Time"}
                  placeholder={language === "ar" ? "الوقت" : "Time"}
                  options={timeOptions(section.court, index)}
                  value={
                    section.time
                      ? {
                          value: section.time,
                          label: `${section.time} `,
                        }
                      : null
                  }
                  errors={errors[`courtSections[${index}].time`]}
                  onChange={(selectedOption) =>
                    handleChangeCourtSection(
                      index,
                      "time",
                      selectedOption?.value || ""
                    )
                  }
                  onBlur={() => handleBlurCourtSection(index, "time")}
                  dir={language === "ar" ? "rtl" : "ltr"}
                  selectLoading={selectLoading}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={addCourtSection}
              className="hover:opacity-50 font-bold text-thirdColor"
            >
              <span className="flex gap-1">
                <CirclePlus size={25} />{" "}
                {language === "ar" ? "أضف حجزًا جديدًا" : "Add New Reservation"}
              </span>
            </button>
          </div>
          <div className="flex gap-4 justify-between mt-4">
            <button
              type="button"
              className="btn btn-error w-24"
              onClick={onClose}
            >
              {language === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button type="submit" className="btn btn-warning w-30">
              {language === "ar" ? "احجز الآن" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
