import React, { useEffect } from "react";
import styles from "../Css/Court.module.css";
import SelectComponent from "./SelectInput";
import { useLanguage } from "../context/LanguageContext";

function GridCourtCard({
  setErrors,
  errors,
  fetchCourtData,
  gridCourtformTimeandDate,
  setGridCourtformTimeandDate,
  chooseDate,
  handleBookNow,
  setChooseDate,
  formCourtsDate,
  selectLoading,
  isLoading,
}) {
  const { language } = useLanguage();

  const getAvailableTimes = (courtId, selectedDate) => {
    const courtData = formCourtsDate[0]?.find(
      (court) => court.court.id === courtId
    );
    if (courtData) {
      const availableSlots = courtData.slots.filter((slot) => {
        return slot.date === selectedDate;
      });
      return availableSlots;
    }
    return [];
  };

  const timeOptions = (courtId, selectedDate) => {
    const availableTimes = getAvailableTimes(courtId, selectedDate);

    return availableTimes.map((time) => ({
      value: `${time.from}-${time.to}`,
      label: `${time.from} - ${time.to}`,
    }));
  };

  const handleChangeCourtSection = (id, field, value) => {
    setGridCourtformTimeandDate((prevState) => {
      const updatedState = { ...prevState };

      if (field === "slots") {
        updatedState[id] = {
          ...updatedState[id],
          [field]: [value],
        };
      }

      if (field === "date") {
        setChooseDate((prevChooseDate) => ({
          ...prevChooseDate,
          [id]: value,
        }));
      }

      return updatedState;
    });
  };

  const handleBlurCourtSection = (id, field) => {
    const updatedErrors = { ...errors };
    const requiredMessage =
      language === "ar" ? "هذا الحقل مطلوب" : "This field is required";

    if (!gridCourtformTimeandDate[id]?.[field]) {
      if (!updatedErrors[id]) {
        updatedErrors[id] = {};
      }
      updatedErrors[id][field] = requiredMessage;
    } else {
      if (updatedErrors[id]) {
        delete updatedErrors[id][field];
        if (Object.keys(updatedErrors[id]).length === 0) {
          delete updatedErrors[id];
        }
      }
    }

    setErrors(updatedErrors);
  };

  return (
    <div
      className={` container mx-auto lg:max-w-screen-2xl px-5 md:px-14   ${styles.App}`}
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 pb-20 relative">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className=" ">
              <div className={`${styles.skeletonCard}`}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonText}></div>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonButton}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={` grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-6 pb-20 relative  ${
            language === "ar" ? "rtl" : "ltr"
          }`}
        >
          {fetchCourtData.map((item, index) => {
            const timeOptionsList = timeOptions(item.id, chooseDate[item.id]);
            const isSlotSelected =
              gridCourtformTimeandDate[item.id]?.slots &&
              gridCourtformTimeandDate[item.id]?.slots.length > 0;

            return (
              <div
                key={item.id}
                className={`shadow-2xl rounded-lg overflow-auto bg-white relative col-span-1 `}
                dir={language === "ar" ? "rtl" : "ltr"}
              >
                <div className="relative w-full h-[400px]">
                  <img
                    src={item.linkimage}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex flex-col items-center p-4 w-full text-white">
                      <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
                      <p className="text-lg mb-4">{item.description}</p>
                      <p className="text-lg mb-4">{item.location}</p>
                      <p className="text-lg mb-2">
                        <span className="font-bold">
                          {language === "ar" ? "سعر الملعب:" : "Court Price:"}{" "}
                        </span>
                        {item.price}{" "}
                        <span className="font-bold">
                          {language === "ar" ? "جنيه" : "EGP"}
                        </span>
                      </p>
                      <div className="w-full">
                        <SelectComponent
                          name="slots"
                          label={language === "ar" ? "الوقت" : "Time"}
                          placeholder={language === "ar" ? "الوقت" : "Time"}
                          options={timeOptionsList}
                          value={
                            gridCourtformTimeandDate[item.id]?.slots
                              ? timeOptionsList.find(
                                  (option) =>
                                    option.value ===
                                    gridCourtformTimeandDate[item.id]?.slots[0]
                                ) || null
                              : null
                          }
                          errors={errors[item.id]?.slots}
                          onChange={(selectedOption) =>
                            handleChangeCourtSection(
                              item.id,
                              "slots",
                              selectedOption?.value || ""
                            )
                          }
                          onBlur={() =>
                            handleBlurCourtSection(item.id, "slots")
                          }
                          dir={language === "ar" ? "rtl" : "ltr"}
                          selectLoading={selectLoading}
                        />
                      </div>
                      <div className="flex space-x-4 w-full gap-3">
                        <button className="bold shadow-lg hover:opacity-70 p-2 py-3 rounded-md border border-mainColor text-w transition-colors w-full">
                          {language === "ar" ? "تفاصيل أكثر" : "More Details"}
                        </button>
                        <button
                          onClick={handleBookNow}
                          className={`bold shadow-lg p-2 py-3 rounded-md transition-colors w-full ${
                            !isSlotSelected
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-mainColor text-black hover:opacity-70"
                          }`}
                          disabled={!isSlotSelected}
                        >
                          {language === "ar" ? "احجز الآن" : "Book Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GridCourtCard;
