import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import AddCourseModal from "../../components/AddCourseModal";

import BodyHeader from "../../components/BodyHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { postAndGetData } from "../../features/customApi/customAPI";

function StatisticTable() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [dataStatistic, setDataStatistic] = useState([]);

  useEffect(() => {
    if (!state) {
      navigate("/StatisticManagement");
    }
    postAndGetData("/statistic", state, setDataStatistic);
  }, []);

  return (
    <>
      <Header />
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg mt-14">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
            className="flex justify-center items-start "
          >
            <BodyHeader text={"Quản lý khóa học"} />
            {/* <AddCourseModal /> */}
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center">
              {/* THead */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID sinh viên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên sinh viên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số buổi đi đủ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nghỉ không phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nghỉ có phép
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phần trăm buổi nghỉ
                  </th>
                </tr>
              </thead>

              <tbody>
                {dataStatistic?.map((cls, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                      >
                        {cls.studentId}
                      </th>

                      <td className="px-6 py-4">{cls.studentName}</td>

                      <td className="px-6 py-4">{cls.present}</td>

                      <td className="px-6 py-4">
                        {cls.absenceWithOutPermission}
                      </td>

                      <td className="px-6 py-4">{cls.absenceWithPermission}</td>

                      <td
                        className={`px-6 py-4 ${
                          cls.percentAbsent > 20
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {cls.percentAbsent}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default StatisticTable;
