import React, { useState, useEffect } from "react";
import styles from "../Css/CustomdataPicker.module.css";
import { useMediaQuery } from "react-responsive";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
const DaysSelector = ({
  setChooseDate,
  selectedDay,
  setSelectedDay,
  setGridCourtformTimeandDate,
}) => {
  const [days, setDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const getUpcomingSevenDays = () => {
    const daysArray = [];
    const startDate = new Date(currentDate);
    if (!isSmallScreen) {
      startDate.setDate(currentDate.getDate() - 3);
    }

    const totalDays = isSmallScreen ? 3 : 7;
    for (let i = 0; i < totalDays; i++) {
      const nextDay = new Date(startDate);
      nextDay.setDate(startDate.getDate() + i);

      const dayName = nextDay
        .toLocaleString("en-us", { weekday: "long" })
        .slice(0, 3);
      const date = nextDay.getDate();
      const month = nextDay.toLocaleString("en-us", { month: "long" });
      const year = nextDay.getFullYear();

      const formattedDate = `${year}-${(nextDay.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

      daysArray.push({
        dayName,
        date,
        month,
        year,
        formattedDate,
        day: nextDay,
        isPast: nextDay < new Date().setHours(0, 0, 0, 0),
      });
    }

    setDays(daysArray);
  };

  useEffect(() => {
    getUpcomingSevenDays();
  }, [currentDate, isSmallScreen]);

  useEffect(() => {
    const todayFormatted = new Date().toLocaleDateString("en-CA");
    setSelectedDay(todayFormatted);

    setChooseDate({ 0: todayFormatted });
  }, []);

  const handleDayClick = (day) => {
    if (day.isPast) return;

    if (selectedDay === day.formattedDate) {
      setSelectedDay("");
      setChooseDate("");
      setGridCourtformTimeandDate({});
    } else {
      setSelectedDay(day.formattedDate);
      setGridCourtformTimeandDate({});
      setChooseDate({ 0: day.formattedDate });
    }
  };

  const handlePrevSevenDays = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (isSmallScreen) {
        newDate.setDate(prevDate.getDate() - 3);
      } else {
        newDate.setDate(prevDate.getDate() - 7);
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (newDate >= today) {
        return newDate;
      } else {
        return prevDate;
      }
    });
  };

  useEffect(() => {
    if (days.length > 0) {
      if (isSmallScreen) {
        setIsPrevDisabled(
          days[0]?.formattedDate === new Date().toISOString().split("T")[0]
        );
      } else {
        setIsPrevDisabled(
          days[3]?.formattedDate === new Date().toISOString().split("T")[0]
        );
      }
    }
  }, [days, currentDate]);

  const handleNextSevenDays = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (isSmallScreen) {
        newDate.setDate(prevDate.getDate() + 3);
        return newDate;
      } else {
        newDate.setDate(prevDate.getDate() + 7);
        return newDate;
      }
    });
  };

  const monthYear = `${currentDate.toLocaleString("en-us", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  return (
    <div className={`${styles.container}  `}>
      <div className={`${styles.monthyear} `}>
        <button
          onClick={handlePrevSevenDays}
          className={`${styles.arrow}`}
          style={{ visibility: isPrevDisabled ? "hidden" : "visible" }}
        >
          <ArrowLeft />
        </button>
        <div>{monthYear}</div>
        <button onClick={handleNextSevenDays} className={`${styles.arrow}`}>
          <ArrowRight />
        </button>
      </div>

      <div className="flex space-x-4 rounded-xl justify-center gap-4">
        {days.map((day) => (
          <div
            key={day.formattedDate}
            className={`flex flex-col items-center justify-center  rounded-md ${
              isSmallScreen ? "w-3 h-3 p-1" : "w-16 h-16 p-3"
            }   cursor-pointer transition-all duration-300 ease-in-out 
              ${
                selectedDay === day.formattedDate
                  ? "bg-mainColor text-mainTextColor shadow-lg transform scale-105"
                  : "bg-transparent text-black hover:bg-gray-200"
              } 
              ${
                day.isPast
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                  : "border-2 border-thirdColor p-9"
              }
            `}
            onClick={() => handleDayClick(day)}
          >
            <div className={` ${isSmallScreen ? "text-lg" : "text-xl"}`}>
              {day.dayName}
            </div>
            <div className={`${isSmallScreen ? "text-lg" : "text-xl"}`}>
              {day.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaysSelector;
