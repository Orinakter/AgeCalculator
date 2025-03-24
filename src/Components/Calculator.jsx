import { useState } from "react";

const Calculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState("");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  const yearArr = [...Array(120).keys()];
  const dayArr = [...Array(31).keys()];

  const calculateAge = () => {
    setError("");

    const selectedYear = parseInt(year);
    const selectedMonth = parseInt(month);
    const selectedDay = parseInt(day);

    if (!selectedDay || !selectedMonth || !selectedYear) {
      setError("Please select a valid date.");
      return;
    }

    const daysInMonth = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };

    if (selectedMonth === 2) {
      const isLeapYear =
        (selectedYear % 4 === 0 && selectedYear % 100 !== 0) ||
        selectedYear % 400 === 0;
      daysInMonth[2] = isLeapYear ? 29 : 28;
    }

    if (selectedDay > daysInMonth[selectedMonth]) {
      setError(
        `Invalid day selection. ${selectedMonth} has only ${daysInMonth[selectedMonth]} days.`
      );
      return;
    }

    let ageYears = currentYear - selectedYear;
    let ageMonths = currentMonth - selectedMonth;
    let ageDays = currentDay - selectedDay;

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    if (ageDays < 0) {
      if (ageMonths > 0) {
        ageMonths -= 1;
      } else {
        ageYears -= 1;
        ageMonths = 11;
      }
      ageDays += daysInMonth[currentMonth === 1 ? 12 : currentMonth - 1];
    }

    if (ageYears < 12) {
      setError("Age must be at least 12 years.");
      setAge("");
      return;
    }

    setAge(`Age: ${ageYears} years, ${ageMonths} months, ${ageDays} days`);
  };

  return (
    <div className="px-4 w-full py-14">
      <div className="p-4 container mx-auto">
        <h2 className="text-4xl mb-6 font-bold">
          Date of Birth (Age minimum 12 years)
        </h2>
        <p>Date of Birth</p>
        <div className="flex w-full gap-2 mt-2">
          {/* Day */}
          <select
            className="border w-full p-2"
            onChange={(e) => setDay(e.target.value)}
            value={day}
          >
            <option value="">Day</option>
            {dayArr.map((d) => (
              <option key={d + 1} value={d + 1}>
                {d + 1}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            className="border w-full p-2"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          >
            <option value="">Month</option>
            {monthArr.map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            className="border w-full p-2"
            onChange={ async(e) => {
                setYear(e.target.value)
                // setTimeout(()=>{
                //     calculateAge()
                // },100)
            }}
            value={year}
            
          >
            <option value="">Year</option>
            {yearArr.map((y) => {
              const calculatedYear = currentYear - y;
              return (
                <option key={calculatedYear} value={calculatedYear}>
                  {calculatedYear}
                </option>
              );
            })}
          </select>
        </div>
        {error && <div className="mt-4">
          <div className="bg-red-100 text-center py-1 px-14">
            {error && (
              <p className="text-red-700 text-xl font-semibold mt-2">{error}</p>
            )}
          </div>
        </div>}

        <div className="py-6 ">
          <p className="">{`${day}/${month}/${year}`}</p>
          <p className="font-medium text-xl">Selected birth date</p>
          <p className=" ">Day: {day}</p>
          <p className=" ">Month: {month}</p>
          {/* <p className=" ">Month: {monthArr[parseInt(month, 10) - 1]}</p> */}
          <p className=" ">Year: {year}</p>
        </div>
        <div className="">
          {age && !error && (
            <p className="text-blue-700 font-semibold text-xl mt-2">{age}</p>
          )}
        </div>
        <div className="">
          <button
            className="bg-blue-800 text-white px-4 py-2 mt-3"
            onClick={calculateAge}
          >
            Calculate Age
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
