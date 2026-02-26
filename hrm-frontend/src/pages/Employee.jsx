import React, { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import AddEditEmployeeModal from "../components/AddEditEmployeeModal";
import ConfirmModal from "../components/ConfirmModal";
import useFetch, { useModal } from "../hooks";

export default function Employees() {
  const { modalState, handleToggle } = useModal();
  const { data: employees, loading, refetch } = useFetch("/employees");

  const [apiError, setApiError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await API.delete(`/employees/${selectedId}`);
      setShowDeleteModal(false);
      refetch();
    } catch (error) {
      setApiError("Failed to delete employee.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employees</h2>
        <button
          className="btn btn-primary"
          onClick={() => handleToggle("addEmployee")}
        >
          + Add Employee
        </button>
      </div>

      {apiError && <div className="alert alert-danger">{apiError}</div>}

      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <EmptyState message="No employees found." />
      ) : (
        <div className="card shadow-sm p-3">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Emp. ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => openDeleteModal(emp._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddEditEmployeeModal
        show={modalState["addEmployee"]}
        onClose={() => handleToggle("addEmployee")}
        onSuccess={refetch}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onConfirm={confirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}
