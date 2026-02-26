import React from "react";
import { useForm } from "react-hook-form";
import API from "../services/api";

export default function AddEditEmployeeModal({ show, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("/employees", data);
      reset();
      onClose();
      onSuccess();
    } catch (error) {
      if (error.response?.data?.message) {
        setError("employeeId", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        alert("Something went wrong");
      }
    }
  };

  if (!show) return null;

  return (
    <React.Fragment>
      <div className="modal show fade d-block" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Add Employee</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Employee ID</label>
                    <input
                      className={`form-control ${
                        errors.employeeId ? "is-invalid" : ""
                      }`}
                      {...register("employeeId", {
                        required: "Employee ID is required",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.employeeId?.message}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.fullName ? "is-invalid" : ""
                      }`}
                      {...register("fullName", {
                        required: "Full Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Numbers are not allowed",
                        },
                      })}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(
                          /[^A-Za-z\s]/g,
                          "",
                        );
                      }}
                    />
                    <div className="invalid-feedback">
                      {errors.fullName?.message}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Department</label>
                    <input
                      className={`form-control ${
                        errors.department ? "is-invalid" : ""
                      }`}
                      {...register("department", {
                        required: "Department is required",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.department?.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </React.Fragment>
  );
}
