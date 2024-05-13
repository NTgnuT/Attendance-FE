import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import BodyHeader from "../../components/BodyHeader";
import { useEffect, useState } from "react";
import AddSchedule from "../../components/AddSchedule";
import { getCApi } from "/src/features/customApi/customAPI.js";

const formattedDate = (dateString) => {
  const datePart = dateString.split("T")[0];
  const parts = datePart.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return day + "/" + month + "/" + year;
};

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    getCApi("/schedule", setSchedules);
  }, [reload]);
  // console.log(reload);
  // console.log(schedules);
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
            <BodyHeader text={"Quản lý lịch học"} />
            <AddSchedule setReload={setReload} reload={reload} />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              {/* THead */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên lớp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tên giáo viên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Module học
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thời gian bắt đầu
                  </th>
                </tr>
              </thead>

              <tbody>
                {schedules?.map((cls) => {
                  return (
                    <tr
                      key={cls.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cls.id}
                      </th>
                      <td className="px-6 py-4">{cls.className}</td>
                      <td className="px-6 py-4">{cls.teacherName}</td>

                      <td className="px-6 py-4">{cls.moduleName}</td>

                      <td className="px-6 py-4">
                        {formattedDate(cls.timeStart)}
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

export default ScheduleManagement;
