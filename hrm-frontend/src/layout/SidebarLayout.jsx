import { NavLink } from "react-router-dom";

export default function SidebarLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h4 className="mb-4 fw-bold">
          <i className="bi bi-building me-2"></i>
          HRMS
        </h4>

        <ul className="nav nav-pills flex-column">
          <li className="nav-item mb-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active bg-primary" : "text-white"
                }`
              }
            >
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active bg-primary" : "text-white"
                }`
              }
            >
              <i className="bi bi-people me-2"></i>
              Employees
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active bg-primary" : "text-white"
                }`
              }
            >
              <i className="bi bi-calendar-check me-2"></i>
              Attendance
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 p-4 bg-light">{children}</div>
    </div>
  );
}
