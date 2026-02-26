import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../services/api";
import useFetch from "../hooks";

export default function AttendanceModal({ show, onClose, onSuccess }) {
  const { data: records } = useFetch("/employees");

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      employeeId: "",
      date: "",
      status: "Present",
    },
  });

  const onSubmit = async (data) => {
    try {
      setApiError("");

      await API.post("/attendance", data);

      reset();
      onClose();
      onSuccess();
    } catch (error) {
      setApiError(error.response?.data?.message || "Error saving attendance");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <h5 className="modal-title">Mark Attendance</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {/* API Error */}
              {apiError && <div className="alert alert-danger">{apiError}</div>}

              {/* Employee Select */}
              <div className="mb-3">
                <label className="form-label">Select Employee</label>
                <select
                  className={`form-select ${errors.employeeId ? "is-invalid" : ""}`}
                  {...register("employeeId", {
                    required: "Employee is required",
                  })}
                >
                  <option value="">-- Select Employee --</option>
                  {records?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.fullName}
                    </option>
                  ))}
                </select>
                {errors.employeeId && (
                  <div className="invalid-feedback">
                    {errors.employeeId.message}
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="mb-3">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.date ? "is-invalid" : ""}`}
                  {...register("date", {
                    required: "Date is required",
                  })}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date.message}</div>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select className="form-select" {...register("status")}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
