import React, { useState, useEffect } from "react";
import styles from "../Css/CustomdataPicker.module.css";
import { useMediaQuery } from "react-responsive";
const DaysSelector = ({
  setChooseDate,
  selectedDay,
  setSelectedDay,
  setGridCourtformTimeandDate,
}) => {
  const [days, setDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getUpcomingSevenDays = () => {
    const daysArray = [];
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 3);

    for (let i = 0; i < 7; i++) {
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
  }, [currentDate]);

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

  // const handlePrevSevenDays = () => {
  //   setCurrentDate((prevDate) => {
  //     const newDate = new Date(prevDate);
  //     newDate.setDate(prevDate.getDate() - 7);
  //     return newDate;
  //   });
  // };

  const handlePrevSevenDays = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (newDate >= today) {
        return newDate;
      } else {
        return prevDate;
      }
    });
  };
  const handleNextSevenDays = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  const monthYear = `${currentDate.toLocaleString("en-us", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.monthyear}`}>
        <button onClick={handlePrevSevenDays} className={`${styles.arrow}`}>
          ←
        </button>
        <div>{monthYear}</div>
        <button onClick={handleNextSevenDays} className={`${styles.arrow}`}>
          →
        </button>
      </div>

      <div className="flex space-x-4 rounded-xl justify-center gap-4">
        {days.map((day) => (
          <div
            key={day.formattedDate}
            className={`flex flex-col items-center justify-center p-3 rounded-md w-16 h-16 cursor-pointer transition-all duration-300 ease-in-out 
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
            <div className="text-xl">{day.dayName}</div>
            <div className="text-md">{day.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaysSelector;
