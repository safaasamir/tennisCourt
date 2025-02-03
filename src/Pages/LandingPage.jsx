import { useCallback, useEffect, useRef, useState } from "react";
import SliderImage from "../Layouts/SliderImage";
import AboutUs from "../Layouts/AboutUs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import claycourt from "../assets/claycourt.jpg";
import claycourt2 from "../assets/claycourt2.jpg";
import CourtCard from "../Layouts/CourtCard";
import axios from "axios";
import { validationSchema } from "../utils/validation/FormSchema";
import * as Yup from "yup";
import { useLanguage } from "../context/LanguageContext";
import { set } from "date-fns";
function LandingPage() {
  const [form, setForm] = useState({
    name: "",
    mobilePhone: "",
    email: "",
    courtSections: [
      {
        court: "",
        courtName: "",
        date: "",
        time: "",
        price: "",
      },
    ],
  });

  const [gridCourtformTimeandDate, setGridCourtformTimeandDate] = useState({});
  const formRef = useRef(null);
  const [courts, setCourts] = useState([]);
  const [formCourtsDate, setFormCourtsDate] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [errors, setErrors] = useState({});
  const [chooseDate, setChooseDate] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const slides = [
    {
      url: claycourt,
    },
    {
      url: claycourt2,
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const fetchCourtData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://185.175.208.7/api/tennis-courts`
      );
      if (response.status === 200) {
        setIsLoading(false);
        setCourts(response.data.data);
      }
    } catch (error) {
      //setIsLoading(false)
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFormTime = async () => {
    try {
      if (Object.keys(chooseDate).length > 0) {
        for (const key in chooseDate) {
          const date = chooseDate[key];
          const formattedDate = formatDate(date);
          setSelectLoading(true);
          const response = await axios.get(
            `http://185.175.208.7/api/timeslots?date=${formattedDate}`
          );
          if (response.status === 200) {
            setSelectLoading(false);

            setFormCourtsDate((prevState) => ({
              ...prevState,
              [key]: response.data.data,
            }));
          }
        }
      } else {
        setFormCourtsDate({});
      }
    } catch (error) {
      setSelectLoading(false);
      console.error("Error fetching court times:", error);
    }
  };

  const formatDate = (date) => {
    const dateParts = date.split("-");
    const day = String(dateParts[0]).padStart(2, "0");
    const month = String(dateParts[1]).padStart(2, "0");
    const year = dateParts[2];

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    fetchCourtData();
  }, []);

  useEffect(() => {
    if (chooseDate) {
      fetchFormTime(chooseDate);
    }
  }, [chooseDate]);

  const createAllSelectedSlots = () => {
    const result = Object.keys(gridCourtformTimeandDate)
      .filter((courtId) => gridCourtformTimeandDate[courtId]?.slots)
      .map((courtId) => {
        let formattedDate = null;

        if (chooseDate && chooseDate[0]) {
          formattedDate = chooseDate[0];
        } else if (chooseDate instanceof Date && !isNaN(chooseDate)) {
          formattedDate = chooseDate.toISOString().split("T")[0];
        } else if (
          typeof chooseDate === "string" &&
          !isNaN(new Date(chooseDate))
        ) {
          formattedDate = new Date(chooseDate).toISOString().split("T")[0];
        } else {
          console.error("Invalid date value:", chooseDate);
        }

        const courtIdString = Number(courtId);
        const selectedCourt = courts.find(
          (court) => court.id === courtIdString
        );
        const price = selectedCourt ? selectedCourt.price : 0;

        return {
          courtId: courtIdString,
          slot: gridCourtformTimeandDate[courtId].slots[0],
          date: formattedDate,
          price: price,
        };
      });

    return result;
  };

  const handleButtonClick = async () => {
    try {
      await validationSchema(language).validate(
        {
          name: form.name,
          email: form.email,
          mobilePhone: form.mobilePhone,
        },
        { abortEarly: false }
      );

      setOpen(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });

        setErrors(validationErrors);
      }
    }
  };

  const handleBookNow = () => {
    const allSelectedSlots = createAllSelectedSlots();

    setForm((prevForm) => {
      const updatedCourtSections = allSelectedSlots.map((slotData) => {
        const selectedCourt = courts.find(
          (court) => court.id === slotData.courtId
        );

        return {
          court: slotData.courtId,
          courtName: selectedCourt ? selectedCourt.name : "",
          date: slotData.date,
          time: slotData.slot,
          price: slotData.price,
        };
      });

      return {
        ...prevForm,
        courtSections: [...prevForm.courtSections, ...updatedCourtSections],
      };
    });

    setChooseDate("");
    setSelectedDay("");
    setFormCourtsDate([]);
    setGridCourtformTimeandDate({});

    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      const targetPosition = formRef.current.offsetTop - 100;

      setTimeout(() => {
        window.scrollTo(0, targetPosition);
      }, 300);
    }

    toast.success(
      "Appointments registered successfully. Complete the form to check your booking!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    handleButtonClick();
  };

  return (
    <main className="font-bricolage-grotesque bg-slate-50">
      <section ref={formRef}>
        <ToastContainer />
        <SliderImage
          handleButtonClick={handleButtonClick}
          slides={slides}
          currentIndex={currentIndex}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          goToSlide={goToSlide}
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          courts={courts}
          formCourtsDate={formCourtsDate}
          chooseDate={chooseDate}
          setChooseDate={setChooseDate}
          open={open}
          setOpen={setOpen}
          selectLoading={selectLoading}
          setSelectedDay={setSelectedDay}
        />
      </section>
      <section>
        <CourtCard
          form={form}
          errors={errors}
          setErrors={setErrors}
          setForm={setForm}
          courts={courts}
          gridCourtformTimeandDate={gridCourtformTimeandDate}
          setGridCourtformTimeandDate={setGridCourtformTimeandDate}
          chooseDate={chooseDate}
          setChooseDate={setChooseDate}
          createAllSelectedSlots={createAllSelectedSlots}
          handleBookNow={handleBookNow}
          setFormCourtsDate={setFormCourtsDate}
          formCourtsDate={formCourtsDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectLoading={selectLoading}
          isLoading={isLoading}
        />
        <AboutUs />
      </section>
    </main>
  );
}

export default LandingPage;
