"use client";
import { useEffect, useState } from "react";
import { fetchVisits } from "@/lib/api";

const VisitsPage = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const data = await fetchVisits();
        setVisits(data);
      } catch (err) {
        setError("Failed to load visits");
      } finally {
        setLoading(false);
      }
    };

    getVisits();
  }, []);

  if (loading) return <p>Loading visits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Visits</h1>
      <ul>
        {visits?.data?.map((visit) => (
          <li key={visit.id}>
            <p>
              <strong>ID:</strong> {visit.id}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(visit.attributes.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitsPage;
