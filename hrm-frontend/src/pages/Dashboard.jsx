import React from "react";
import { useState, useEffect } from "react";
import API from "../services/api";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/employees");
      setCount(response.data.length);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employee data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <Loader />;

  return (
    <React.Fragment>
      <h2 className="mb-4 fw-bold">Dashboard</h2>

      {error && <div className="alert alert-danger shadow-sm">{error}</div>}

      {!error && (
        <div className="card shadow-lg border-0 p-4 rounded-4">
          <h5 className="text-muted">Total Employees</h5>
          <h2 className="text-primary fw-bold display-6">{count || 0}</h2>
        </div>
      )}
    </React.Fragment>
  );
}
