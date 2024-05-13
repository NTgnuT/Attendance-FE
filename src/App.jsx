import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login/LoginPage.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SideBar from "./components/SideBar.jsx";
// import Table from "./components/Table.jsx"
import SideBarWithNavBar from "./components/SideBarWithNavBar.jsx";
import Header from "./components/Header.jsx";
import Pagination from "./components/Pagination.jsx";
import AddClassModal from "./components/AddClassModal.jsx";
// import EditModal from "./components/EditModal.jsx"
import ClassManagement from "./pages/Management/ClassManagement.jsx";
import StudentManagement from "./pages/Management/StudentManagement.jsx";
import CourseManagement from "./pages/Management/CourseManagement.jsx";
import TeacherManagement from "./pages/Management/TeacherManagement.jsx";
import ModuleCourseManagement from "./pages/Management/ModuleCourseManagement.jsx";

import "./App.css";
import AttendanceManagement from "./pages/Management/AttendanceManagement.jsx";
import ScheduleManagement from "./pages/Management/ScheduleManagement.jsx";
import AttendanceTable from "./pages/Management/AttendanceTable.jsx";
import StatisticManagement from "./pages/Management/StatisticManagement.jsx";
import StatisticTable from "./pages/Management/StatisticTable.jsx";

function App() {
  return (
    <>
      {/* <Header /> */}

      <BrowserRouter>
        {/* <NavBar /> */}
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/sidebar" element={<SideBar />} />
          <Route path="/header" element={<Header />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/ClassManagement" element={<ClassManagement />} />
          <Route path="/StudentManagement" element={<StudentManagement />} />
          <Route path="/CourseManagement" element={<CourseManagement />} />
          <Route path="/TeacherManagement" element={<TeacherManagement />} />
          <Route
            path="/AttendanceManagement"
            element={<AttendanceManagement />}
          />
          <Route path="/ScheduleManagement" element={<ScheduleManagement />} />
          <Route path="/AttendanceTable" element={<AttendanceTable />} />
          <Route path="/StatisticTable" element={<StatisticTable />} />
          <Route
            path="/StatisticManagement"
            element={<StatisticManagement />}
          />
          <Route
            path="/ModuleCourseManagement"
            element={<ModuleCourseManagement />}
          />
          <Route path="/AddClassModal" element={<AddClassModal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
