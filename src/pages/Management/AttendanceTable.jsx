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
  const datePart = dateString.split("T")[0];
  const [year, month, day] = datePart.split("-");
  const formattedDate = new Date(year, month - 1, day); // month - 1 vì tháng trong Date bắt đầu từ 0
  const currentDate = new Date();
  // So sánh ngày không tính giờ, phút, giây
  return formattedDate.toDateString() === currentDate.toDateString();
};

function AttendanceTable() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  // Kiểm tra xem state có dữ liệu được truyền không
  const [dataAttendance, setDataAttendance] = useState([]);

  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAttendanceDetails = [];
    dataAttendance.forEach((dt) => {
      dt.attendanceDetailResponses.forEach((d) => {
        const selectElement = document.getElementById(`select-${d.id}`);
        if (!selectElement.disabled) {
          let selectValue = selectElement.value;
          if (selectValue === "Lựa chọn") {
            selectValue = "kp";
          }
          updatedAttendanceDetails.push({
            id: d.id,
            status: selectValue,
            studentId: d.studentId,
            scheduleId: dt.scheduleId,
          });
        }
      });
    });
    console.log(updatedAttendanceDetails);
    setAttendanceDetails(updatedAttendanceDetails);
    sendAttendanceDetails(updatedAttendanceDetails);
  };

  console.log(attendanceDetails);

  const sendAttendanceDetails = (attendanceDetails) => {
    postAndGetData("/attendance-detail/update", attendanceDetails)
      .then((response) => {
        console.log("Dữ liệu điểm danh đã được gửi thành công!");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gửi dữ liệu điểm danh:", error);
      });
  };

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
          </div>

          <form>
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
                                        id={`select-${d.id}`}
                                        disabled={!checkDate(dt.timeAttendance)}
                                        className="block bg-white border border-gray-300 text-gray-700 min-px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                                      >
                                        <option value={null}>Lựa chọn</option>
                                        <option
                                          selected={
                                            d.status ==
                                            "ABSENCE_WITHOUT_PERMISSION"
                                          }
                                          value="kp"
                                        >
                                          Nghỉ không phép
                                        </option>
                                        <option
                                          selected={
                                            d.status ==
                                            "ABSENCE_WITH_PERMISSION"
                                          }
                                          value="cp"
                                        >
                                          Nghỉ có phép
                                        </option>
                                        <option
                                          selected={d.status == "PRESENT"}
                                          value="d"
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
            <Button
              className="bg-green-500 font-bold py-2 px-4 rounded mt-4 float-right"
              onClick={handleSubmit}
            >
              Điểm danh
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AttendanceTable;
