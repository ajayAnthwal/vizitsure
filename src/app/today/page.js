"use client";
import { useEffect, useState } from "react";
import { fetchVisits } from "@/lib/api";  // Assuming fetchVisits function is correctly implemented

const VisitsPage = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const data = await fetchVisits(); // Make the API call
        setVisits(data.data); // Assuming `data` contains the visit data under `data`
      } catch (err) {
        setError("Failed to load visits");
      } finally {
        setLoading(false);
      }
    };

    getVisits();  // Fetch the visits when component mounts
  }, []);

  // If the data is loading or there was an error, display the loading message or error
  if (loading) return <p>Loading visits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Visits</h1>
      {visits.length === 0 ? (
        <p>No visits available.</p>
      ) : (
        <ul className="space-y-4">
          {visits.map((visit) => (
            <li key={visit.id} className="border p-4 rounded-md shadow-sm">
              <p>
                <strong>ID:</strong> {visit.id}
              </p>
              <p>
                <strong>Name:</strong> {visit.attributes.name}  {/* Assuming 'name' is in 'attributes' */}
              </p>
              <p>
                <strong>Status:</strong> {visit.attributes.status} {/* Assuming 'status' is in 'attributes' */}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(visit.attributes.createdAt).toLocaleDateString()} {/* Format date */}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VisitsPage;
