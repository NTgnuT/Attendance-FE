import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import AddClassModal from "../../components/AddClassModal";
import BodyHeader from "../../components/BodyHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCApi } from "/src/features/customApi/customAPI.js";
import { useNavigate } from 'react-router';
function AttendanceManagement() {
  const [classes, setClasses] = useState([]);
  const [moduleCourses, setModuleCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [courseId, setcourseId] = useState(0);
  const [classId, setclassId] = useState(0);
  const handleClassChange = async (event) => {
    setcourseId(0);
    let num = event.target.value;
    if (num > 0) {
      await axios
        .get("http://localhost:8080/user-management/api/classes/" + num)
        .then((response) => {
          setcourseId(response.data.courses);
          setclassId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setcourseId(0);
      setclassId(0);
      setModuleCourses([]);
      setCourse([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (courseId <= 0 || classId <= 0) {
      return;
    }
    const { sendClassId, sendCourseId, sendModuleCourseId } =
      event.target.elements;
    const sClassId = sendClassId.value;
    const sCourseId = sendCourseId.value;
    const sModuleCourseId = sendModuleCourseId.value;
    navigate('/AttendanceTable', { state: { classId: sClassId, moduleId: sModuleCourseId } });
  };
  useEffect(() => {
    getCApi("/classes", setClasses);
  }, []);

  useEffect(() => {
    if (courseId > 0) {
      getCApi("/courses/" + courseId, setCourse);
      getCApi("/module-courses/" + courseId, setModuleCourses);
    }
  }, [courseId]);

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
            <BodyHeader text={"Quản lý điểm danh"} />
            <AddClassModal />
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 p-4 rounded-md mb-4"
          >
            <label className="block mb-2">Chọn lớp:</label>
            <select
              name="sendClassId"
              className="w-full px-4 py-2 border rounded-md mb-2"
              onChange={handleClassChange}
            >
              <option value={0} selected>
                Lựa chọn
              </option>
              {classes.map((cls) => (
                <option value={cls.id}>{cls.name}</option>
              ))}
            </select>

            <label className="block mb-2">Chọn khóa học</label>
            <select
              name="sendCourseId"
              className="w-full px-4 py-2 border rounded-md mb-2"
            >
              {course ? (
                <option value={courseId}>{course.title}</option>
              ) : (
                <></>
              )}
            </select>
            <label className="block mb-2">Chọn module</label>
            <select
              name="sendModuleCourseId"
              className="w-full px-4 py-2 border rounded-md mb-2"
            >
              {moduleCourses.map((cls) => (
                <option value={[cls.id]}>{cls.moduleName}</option>
              ))}
            </select>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AttendanceManagement;
