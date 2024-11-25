"use client";
import { useState } from "react";

const dummyData = [
  { name: "John Doe", status: "Checked In", checkIn: "09:00 AM", checkOut: "" },
  {
    name: "Jane Smith",
    status: "Checked Out",
    checkIn: "08:30 AM",
    checkOut: "10:00 AM",
  },
  {
    name: "Alice Johnson",
    status: "Checked In",
    checkIn: "09:15 AM",
    checkOut: "",
  },
  {
    name: "Michael Brown",
    status: "Checked Out",
    checkIn: "08:45 AM",
    checkOut: "09:30 AM",
  },
  {
    name: "Chris Evans",
    status: "Checked In",
    checkIn: "10:00 AM",
    checkOut: "",
  },
  {
    name: "Scarlett Johansson",
    status: "Checked Out",
    checkIn: "07:45 AM",
    checkOut: "08:30 AM",
  },
  {
    name: "Robert Downey Jr.",
    status: "Checked In",
    checkIn: "10:15 AM",
    checkOut: "",
  },
  {
    name: "Mark Ruffalo",
    status: "Checked Out",
    checkIn: "09:00 AM",
    checkOut: "10:30 AM",
  },
  {
    name: "Tom Holland",
    status: "Checked In",
    checkIn: "11:00 AM",
    checkOut: "",
  },
  {
    name: "Zendaya",
    status: "Checked Out",
    checkIn: "08:00 AM",
    checkOut: "09:00 AM",
  },
  {
    name: "Natalie Portman",
    status: "Checked In",
    checkIn: "11:30 AM",
    checkOut: "",
  },
  {
    name: "Chris Hemsworth",
    status: "Checked Out",
    checkIn: "09:30 AM",
    checkOut: "10:45 AM",
  },
  {
    name: "Gal Gadot",
    status: "Checked In",
    checkIn: "12:00 PM",
    checkOut: "",
  },
  {
    name: "Henry Cavill",
    status: "Checked Out",
    checkIn: "07:30 AM",
    checkOut: "08:15 AM",
  },
  {
    name: "Ben Affleck",
    status: "Checked In",
    checkIn: "12:30 PM",
    checkOut: "",
  },
  {
    name: "Jason Momoa",
    status: "Checked Out",
    checkIn: "08:15 AM",
    checkOut: "09:45 AM",
  },
  {
    name: "Ezra Miller",
    status: "Checked In",
    checkIn: "01:00 PM",
    checkOut: "",
  },
  {
    name: "Amy Adams",
    status: "Checked Out",
    checkIn: "09:45 AM",
    checkOut: "10:15 AM",
  },
  {
    name: "Grant Gustin",
    status: "Checked In",
    checkIn: "01:30 PM",
    checkOut: "",
  },
  {
    name: "Candice Patton",
    status: "Checked Out",
    checkIn: "08:30 AM",
    checkOut: "09:30 AM",
  },
];

export default function VisitorGatePass() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const rowsPerPage = 10;

  const filteredData = dummyData
    .filter((item) => {
      if (filter === "checkedIn") {
        return item.status === "Checked In";
      } else if (filter === "notCheckedOut") {
        return item.status === "Checked In" && !item.checkOut;
      } else if (filter === "checkedOut") {
        return item.status === "Checked Out";
      }
      return true;
    })
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="md:h-[84.5vh] h-auto bg-gray-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="container mx-auto bg-white shadow-md rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 sm:mb-0">
            Create Gate Pass
          </button>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Show All</option>
              <option value="checkedIn">Show Check-in</option>
              <option value="notCheckedOut">
                Show Check-in (Not Checked-Out)
              </option>
              <option value="checkedOut">Show All Checked-Out</option>
            </select>
            <input
              type="text"
              placeholder="Search visitor"
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">
                  Check-In
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm sm:text-base">
                  Check-Out
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                      {item.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                      {item.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                      {item.checkIn}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                      {item.checkOut || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center text-sm sm:text-base"
                  >
                    No Visits available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <p className="text-sm mb-4 sm:mb-0">
            {filteredData.length > 0
              ? `${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(
                  currentPage * rowsPerPage,
                  filteredData.length
                )} of ${filteredData.length} rows`
              : "0 rows"}
          </p>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 border rounded-md ${
                currentPage === 1 ? "bg-gray-200" : "bg-white"
              }`}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            <p>
              Page {currentPage} / {totalPages}
            </p>
            <button
              className={`px-3 py-1 border rounded-md ${
                currentPage === totalPages ? "bg-gray-200" : "bg-white"
              }`}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
