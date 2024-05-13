import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import AddTeacherModal from "../../components/AddTeacherModal";
import EditTeacherModal from "../../components/EditTeacherModal.jsx";
import BodyHeader from "../../components/BodyHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "flowbite/dist/flowbite.js";
import {
  fetchTeacher,
  deleteTeacher,
  //   selectAllClass,
} from "../../features/teachers/TeacherSlice.js";
import { Button } from "flowbite-react";
import { Modal } from "antd";
// import { Link } from "react-router-dom";
// import {Loader} from "react-loader-spinner";
// import { TailSpin } from 'react-loader-spinner';

const formattedDate = (dateString) => {
  const datePart = dateString.split("T")[0];
  const parts = datePart.split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  return day + "/" + month + "/" + year;
};

function CourseManagement() {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.teachers);
  const fetchStatus = useSelector((state) => state.teachers.status);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchTeacher({ page: 0, size: 10, keyword }));
    }
  }, [dispatch, keyword, fetchStatus]);

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
            <AddTeacherModal />
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
                    Tên giáo viên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số điện thoại
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Địa chỉ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày sinh
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
                {teachers?.map((cls) => {
                  return (
                    <tr
                      key={cls.teacherID}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cls.instructorId}
                      </th>
                      <td className="px-6 py-4">{cls.name}</td>
                      <td className="px-6 py-4">{cls.email}</td>

                      <td className="px-6 py-4">{cls.phoneNumber}</td>
                      <td className="px-6 py-4">{cls.address}</td>
                      <td className="px-6 py-4">{formattedDate(cls.dob)}</td>
                      <td className="px-6 py-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultValue=""
                            className="sr-only peer"
                            defaultChecked="Active"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                        </label>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Button
                          onClick={() => {
                            Modal.confirm({
                              title: "Xác nhận",
                              content: "Bạn có chắc chắn với hành động này?",
                              onOk: () => {
                                dispatch(deleteTeacher(cls.teacherID))
                                  .then(() => {})
                                  .catch(() => {});
                              },
                              onCancel: () => {},
                            });
                          }}
                          // className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Xóa
                        </Button>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {<EditTeacherModal data={cls} />}
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

export default CourseManagement;
