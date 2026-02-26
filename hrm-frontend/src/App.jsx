import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./layout/SidebarLayout";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employee";
import Attendance from "./pages/Attendence";

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}

export default App;
