"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const rowsPerPage = 10;
const todayDate = new Date().toISOString().split("T")[0];

export default function VisitorGatePass() {
  const [visits, setVisits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("todayCheckIn");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("auth");
      if (!authToken) {
        console.error("No auth token found!");
        setLoading(false);
        return;
      }

      let apiUrl = `https://www.vizitsure.com/gapi/api/visits?pagination[page]=${currentPage}&pagination[pageSize]=${rowsPerPage}&populate=*`;

      if (filter === "todayCheckIn") {
        apiUrl += `&filters[status]=IN&filters[checkin][$gte]=${todayDate}`;
      } else if (filter === "approved") {
        apiUrl += `&filters[status]=APPROVED`;
      } else if (filter === "unapproved") {
        apiUrl += `&filters[status]=UNAPPROVED`;
      } else if (filter === "checkedOut") {
        apiUrl += `&filters[status]=OUT`;
      }

      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      setVisits(data.data || []);
      setTotalPages(data.meta?.pagination.pageCount || 1);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
    setLoading(false);
  }, [currentPage, filter]);

  useEffect(() => {
    fetchData();
  }, [currentPage, filter, fetchData]);

  const filteredData = visits
    .filter((item) => item.attributes?.visitor?.data?.attributes?.company_name)
    .map((item) => ({
      ...item,
      companyName:
        item.attributes?.visitor?.data?.attributes?.company_name || "Unknown",
      status: item.attributes?.status || "Unknown",
      checkin: item.attributes?.checkin
        ? new Date(item.attributes.checkin).toLocaleString()
        : "N/A",
      checkout: item.attributes?.checkout
        ? new Date(item.attributes.checkout).toLocaleString()
        : "N/A",
    }))
    .filter((item) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="md:h-[84.5vh] h-auto bg-gray-100 p-4 sm:p-6 flex items-center justify-center">
      <div className="container mx-auto bg-white shadow-md rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <Link href="/visitor-gate-pass">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 sm:mb-0">
              Create Gate Pass
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todayCheckIn">Today&apos;s Check-Ins</option>
              <option value="approved">Approved Visitors</option>
              <option value="unapproved">Unapproved Visitors</option>
              <option value="checkedOut">Checked Out</option>
            </select>
            <input
              type="text"
              placeholder="Search Company Name"
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center p-4">Loading...</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Company Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Check-In
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Check-Out
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {item.companyName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.checkin}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.checkout}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      No Visits available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-4">
          <p className="text-sm mb-4 sm:mb-0">
            Page {currentPage} / {totalPages}
          </p>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>
            <button
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
