import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import BodyHeader from "../../components/BodyHeader";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { getCApi, postAndGetData } from "../../features/customApi/customAPI";

const formattedDate = (dateString) => {
  const datePart = dateString.split("T")[0];
  const parts = datePart.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return day + "/" + month + "/" + year;
};

const checkDate = (dateString) => {
  console.log("dateString" + dateString);
  const datePart = dateString.split("T")[0];
  const parts = datePart.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  const formattedD = new Date(year, month, day);
  const currentDate = new Date();
  if (formattedD.getTime() === currentDate.getTime()) {
    return true;
  } else {
    return false;
  }
};

function AttendanceTable() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  // Kiểm tra xem state có dữ liệu được truyền không
  const [dataAttendance, setDataAttendance] = useState([]);
  useEffect(() => {
    if (!state) {
      navigate("/AttendanceManagement");
    }
    postAndGetData("/attendance", state, setDataAttendance);
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
            <BodyHeader text={"Quản lý lịch học"} />
            <Button>ádasd</Button>
          </div>

          <div
            style={{
              backgroundColor: "#F2F2F2",
              overflow: "auto",
              width: "100%",
              maxHeight: "75vh",
            }}
          >
            <div className="w-full h-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {/* THead */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="border border-white">
                    <th
                      scope="col"
                      className="px-6 py-3 min-w-10 text-center border border-white"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 min-w-36 text-center border border-white"
                    >
                      Tên học sinh
                    </th>
                    {dataAttendance?.map((cls, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-6 py-3 min-w-24 text-center border border-white"
                      >
                        {formattedDate(cls.timeAttendance)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {dataAttendance[1]?.attendanceDetailResponses?.map(
                    (cls, index) => (
                      <tr key={index}>
                        <td
                          scope="col"
                          className="px-6 py-3 border border-white"
                        >
                          {cls.studentId}
                        </td>
                        <td
                          scope="col"
                          className="px-6 py-3 border border-white"
                        >
                          {cls.studentName}
                        </td>
                        {dataAttendance?.map((dt, i) => (
                          <React.Fragment key={i}>
                            {dt?.attendanceDetailResponses?.map((d, id) => {
                              if (d.studentId == cls.studentId) {
                                return (
                                  <td
                                    key={id}
                                    scope="col"
                                    className="px-6 py-3 border border-white"
                                  >
                                    <select
                                      disabled={!checkDate(dt.timeAttendance)}
                                      className="block bg-white border border-gray-300 text-gray-700 min-px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                                    >
                                      <option value={null}>Lựa chọn</option>
                                      <option
                                        selected={
                                          d.status ==
                                          "ABSENCE_WITHOUT_PERMISSION"
                                        }
                                        value="ABSENCE_WITHOUT_PERMISSION"
                                      >
                                        Nghỉ không phép
                                      </option>
                                      <option
                                        selected={
                                          d.status == "ABSENCE_WITH_PERMISSION"
                                        }
                                        value="ABSENCE_WITH_PERMISSION"
                                      >
                                        Nghỉ có phép
                                      </option>
                                      <option
                                        selected={d.status == "PRESENT"}
                                        value="PRESENT"
                                      >
                                        Có mặt
                                      </option>
                                    </select>
                                  </td>
                                );
                              }
                            })}
                          </React.Fragment>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceTable;
