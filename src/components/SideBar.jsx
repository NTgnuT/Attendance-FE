import * as React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-0 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/ClassManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-graduation-cap ml-2"></i>
                <div className="flex-auto">Quản lý lớp học</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/TeacherManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-user ml-2"></i>
                <div className="flex-auto">Quản lý nhân viên</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/StudentManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-user ml-2"></i>
                <div className="flex-auto">Quản lý sinh viên</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/CourseManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-graduation-cap ml-2"></i>
                <div className="flex-auto">Quản lý khóa học</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/ModuleCourseManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-book ml-2"></i>
                <div className="flex-auto">Quản lý Module</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/ScheduleManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-calendar-days ml-2"></i>
                <div className="flex-auto">Quản lý lịch học</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/AttendanceManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-calendar-days ml-2"></i>
                <div className="flex-auto">Quản lý điểm Danh</div>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/StatisticManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-chart-simple ml-2"></i>
                <div className="flex-auto">Thống kê</div>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/PostManagement"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <div className="flex gap-2.5 justify-center  py-2 text-base leading-7 text-black">
                <i class="fa-solid fa-newspaper ml-2"></i>
                <div className="flex-auto">Quản lý bài viết</div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
