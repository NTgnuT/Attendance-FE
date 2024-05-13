import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import EditStudentModal from "../../components/EditStudentModal";
import BodyHeader from "../../components/BodyHeader";
import StudentAddModal from "../../components/StudentAddModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Modal } from "antd";

import {
  fetchStudents,
  deleteStudent,
} from "../../features/students/StudentSlice.js";
import { Button } from "flowbite-react";
import { getCApi } from "/src/features/customApi/customAPI.js";

function ClassManagement() {
  const [students, setStudents] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getCApi("/students", setStudents);
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
            <BodyHeader text={"Quản lý học sinh"} />
            <StudentAddModal />
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
                    Họ và Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SDT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DOB
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mã lớp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Trạng thái
                  </th>
                  <th colSpan={2} className="text-center ">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {students?.map((cls) => {
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
                      <td className="px-6 py-4">{cls.name}</td>
                      <td className="px-6 py-4">{cls.phoneNumber}</td>

                      <td className="px-6 py-4">{cls.email}</td>
                      <td className="px-6 py-4">{cls.dob}</td>
                      <td className="px-6 py-4">{cls?.aclass?.name}</td>
                      <td className="px-6 py-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultValue=""
                            className="sr-only peer"
                            defaultChecked="Active"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                          {/* <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Checked toggle
                          </span> */}
                        </label>
                      </td>
                      {/* <td className="px-6 py-4">{cls.teacher.name}</td> */}

                      <td className="px-6 py-4 text-right">
                        <Button
                          onClick={() => {
                            Modal.confirm({
                              title: "Xác nhận",
                              content: "Bạn có muốn thực hiện hành động này?",
                              onOk: () => {
                                dispatch(deleteStudent(cls.id))
                                  .then(() => {})
                                  .catch(() => {});
                              },
                              onCancel: () => {},
                            });
                          }}
                        >
                          Xóa
                        </Button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {<EditStudentModal data={cls} />}
                      </td>
                    </tr>
                  );
                })}

                {/*  */}
              </tbody>
            </table>
          </div>

          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );
}

export default ClassManagement;
