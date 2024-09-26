import React from 'react';

const CircleButton: React.FC<{ month: string; colorClass: string }> = ({ month, colorClass }) => {
  const handleClick = () => {
    alert(`You clicked on ${month}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-16 h-16 md:w-20 md:h-20 ${colorClass} text-white rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300 border-double border-4 border-white-500`}
    >
      {month}
    </button>
  );
};

const HjulComponent: React.FC = () => {
  const months = [
    { name: 'Jan', colorClass: 'bg-red-500' },
    { name: 'Feb', colorClass: 'bg-orange-500' },
    { name: 'Mar', colorClass: 'bg-yellow-500' },
    { name: 'Apr', colorClass: 'bg-green-500' },
    { name: 'May', colorClass: 'bg-teal-500' },
    { name: 'Jun', colorClass: 'bg-blue-500' },
    { name: 'Jul', colorClass: 'bg-indigo-500' },
    { name: 'Aug', colorClass: 'bg-purple-500' },
    { name: 'Sep', colorClass: 'bg-pink-500' },
    { name: 'Oct', colorClass: 'bg-red-500' },
    { name: 'Nov', colorClass: 'bg-orange-500' },
    { name: 'Dec', colorClass: 'bg-yellow-500' },
  ];

  return (
    <div className="relative w-full h-[500px] flex justify-center items-center">
      {/* Background Image */}
      <div className="absolute">
        <img
          src="/tarahjul.png"
          alt="Seasons background"
          className="w-96 h-96 object-cover rounded-full transform transition-transform duration-300"
        />
      </div>
      
      {/* Buttons placed in a circular layout */}
      <div className="absolute flex justify-center items-center">
        {months.map((month, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              transform: `rotate(${index * 30}deg) translate(220px) rotate(-${index * 30}deg)`,
            }}
          >
            <CircleButton month={month.name} colorClass={month.colorClass} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HjulComponent;
