import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [month, setMonth] = useState<number>(6); // July by default
  const [year, setYear] = useState<number>(2023);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const years = [2023, 2024, 2025, 2026, 2027];

  const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate(); // Get the last day of the month
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the first day of the current month

  const daysArray = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);

  return (
    <div className="w-80 flex flex-col bg-white border shadow-lg rounded-xl overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      {/* Calendar */}
      <div className="p-3 space-y-0.5">
        {/* Months */}
        <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
          {/* Prev Button */}
          <div className="col-span-1">
            <button
              type="button"
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-label="Previous"
              onClick={() => setMonth((prev) => (prev === 0 ? 11 : prev - 1))}
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>
          </div>

          {/* Month / Year */}
          <div className="col-span-3 flex justify-center items-center gap-x-1">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 dark:text-neutral-200"
            >
              {months.map((monthName, index) => (
                <option key={index} value={index}>
                  {monthName}
                </option>
              ))}
            </select>

            <span className="text-gray-800 dark:text-neutral-200">/</span>

            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 dark:text-neutral-200"
            >
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Next Button */}
          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              className="size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-label="Next"
              onClick={() => setMonth((prev) => (prev === 11 ? 0 : prev + 1))}
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Weeks */}
        <div className="flex pb-1.5">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
            <span key={index} className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
              {day}
            </span>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null).map((_, index) => (
            <div key={index} className="m-px w-10 h-10"></div>
          ))}
          {daysArray.map((day) => (
            <div key={day}>
              <button
                type="button"
                className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 focus:outline-none dark:text-neutral-200"
              >
                {day}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
