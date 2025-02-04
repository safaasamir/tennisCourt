import { useState } from "react";
import DaysSelector from "../Components/CustomDatePicker";
import GridCourtCard from "../Components/GridCourtCard";
import { useLanguage } from "../context/LanguageContext";
function CourtCard({
  form,
  setForm,
  errors,
  setErrors,
  courts,
  courtsDate,
  setGridCourtformTimeandDate,
  gridCourtformTimeandDate,
  chooseDate,
  setChooseDate,
  createAllSelectedSlots,
  handleBookNow,
  formCourtsDate,
  setFormCourtsDate,
  selectedDay,
  setSelectedDay,
  selectLoading,
  isLoading = false,
  slides
}) {
  const { language } = useLanguage();
  return (
    <div className=" relative container mx-auto mt-10  " id="court">
      <h2
        id="courts"
        className="font-bold text-3xl text-thirdColor text-center  mt-20 drop-shadow-lg"
      >
        {language === "ar" ? "ملاعبنا" : "Our Courts"}
      </h2>
      {
        <DaysSelector
          chooseDate={chooseDate}
          setChooseDate={setChooseDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setGridCourtformTimeandDate={setGridCourtformTimeandDate}
        />
      }
      <GridCourtCard
        form={form}
        errors={errors}
        setErrors={setErrors}
        setForm={setForm}
        fetchCourtData={courts}
        courtsDate={courtsDate}
        gridCourtformTimeandDate={gridCourtformTimeandDate}
        setGridCourtformTimeandDate={setGridCourtformTimeandDate}
        chooseDate={chooseDate}
        createAllSelectedSlots={createAllSelectedSlots}
        handleBookNow={handleBookNow}
        setChooseDate={setChooseDate}
        formCourtsDate={formCourtsDate}
        setFormCourtsDate={setFormCourtsDate}
        selectLoading={selectLoading}
        isLoading={isLoading}
        setSelectedDay={setSelectedDay}
        slides={slides}
      />
    </div>
  );
}

export default CourtCard;
