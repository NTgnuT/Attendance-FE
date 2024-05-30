import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Button } from "antd";

import BodyHeader from "../../components/BodyHeader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { postAndGetData } from "../../features/customApi/customAPI";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

function StatisticTable() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const [dataStatistic, setDataStatistic] = useState([]);
  const [error, setError] = useState("");

  // const exportToExcel = (e) => {
  //   e.preventDefault();

  //   const wb = new ExcelJS.Workbook();
  //   const ws = wb.addWorksheet(sheetName);
  //   const header = Object.keys(dataStatistic[0]);
  //   console.log("header", header);

  //   ws.addRow(header);
  //   dataStatistic.forEach((dt) => {
  //     console.log(dt);
  //     row = ws.addRow(Object.values(dt))
  //   });

  //   const buf = wb.xlsx.writeBuffer();
  //   saveAs(new Blod([buf]), `${fileName}.xlsx`)
  // };

  function exportToExcel(fileName, sheetName, table) {
    if (dataStatistic.length === 0) {
      console.log("Chưa có data");
      return;
    }
    console.log("exportData", dataStatistic);

    let wb;
    if (table && table !== "") {
      const tableElement = document.getElementById(table);
      if (tableElement) {
        wb = XLSX.utils.table_to_book(tableElement);
      } else {
        console.error(`Table with id ${table} not found.`);
        return;
      }
    } else {
      const ws = XLSX.utils.json_to_sheet(dataStatistic);
      wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    }
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  useEffect(() => {
    if (!state) {
      navigate("/StatisticManagement");
    }
    postAndGetData("/statistic", state, setDataStatistic, setError);
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
            {error && (
              <Alert
                color="failure"
                icon={HiInformationCircle}
                onDismiss={() => setError("")}
              >
                <span className="font-medium">{error}</span>
              </Alert>
            )}
          </div>

          <form action="">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table
                className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center"
                id="data"
              >
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
                          name="studentId"
                          id={`${cls.studentId}`}
                        >
                          {cls.studentId}
                        </th>

                        <td className="px-6 py-4" name="studentName">
                          {cls.studentName}
                        </td>

                        <td className="px-6 py-4" name="present">
                          {cls.present}
                        </td>

                        <td
                          className="px-6 py-4"
                          name="absenceWithOutPermission"
                        >
                          {cls.absenceWithOutPermission}
                        </td>

                        <td className="px-6 py-4" name="absenceWithPermission">
                          {cls.absenceWithPermission}
                        </td>

                        <td
                          className={`px-6 py-4 ${
                            cls.percentAbsent > 20
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                          name="percentAbsent"
                        >
                          {cls.percentAbsent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Button
              className="bg-green-500 font-bold py-2 px-4 rounded mt-4 float-right"
              onClick={() =>
                exportToExcel("Thống kê điểm danh", "Statistic", "data")
              }
            >
              Xuất excel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default StatisticTable;
