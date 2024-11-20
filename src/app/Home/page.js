import React from "react";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-[84.5vh] bg-gray-100">
      <div className="p-6 bg-gray-200 rounded-lg shadow-md">
        <button className="w-full py-2 mb-4 text-white bg-gray-700 rounded hover:bg-gray-800">
          List & Search Visitor
        </button>
        <button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Create Gate Pass
        </button>
      </div>
    </div>
  );
};

export default Home;
