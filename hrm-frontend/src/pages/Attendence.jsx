import React, { useState, useMemo } from "react";
import Loader from "../components/Loader";
import AttendanceModal from "../components/AttendanceModal";
import useFetch, { useModal } from "../hooks";

export default function Attendance() {
  const { modalState, handleToggle } = useModal();
  const {
    data: records = [],
    loading,
    error,
    refetch,
  } = useFetch("/attendance");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      const employeeName = rec.employeeId?.fullName?.toLowerCase() || "";
      const employeeCode = rec.employeeId?.employeeId?.toLowerCase() || "";

      const matchesSearch =
        employeeName.includes(searchTerm.toLowerCase()) ||
        employeeCode.includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "" || rec.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchTerm, statusFilter]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Attendance List</h2>
        <button
          className="btn btn-primary"
          onClick={() => handleToggle("markAttendence")}
        >
          Mark Attendance
        </button>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Employee Name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="card-body p-0">
          {loading ? (
            <Loader />
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Emp ID</th>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((rec) => (
                      <tr key={rec._id}>
                        <td>{rec.employeeId?.employeeId || "N/A"}</td>
                        <td>{rec.employeeId?.fullName || "N/A"}</td>
                        <td>{new Date(rec.date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge ${
                              rec.status === "Present"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No Attendance Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AttendanceModal
        show={modalState["markAttendence"]}
        onClose={() => handleToggle("markAttendence")}
        onSuccess={refetch}
      />
    </div>
  );
}
