import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Modal as Modal1 } from "antd";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, Select } from "flowbite-react";
import { createCApi, getCApi } from "../features/customApi/customAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeacher,
  //   selectAllClass,
} from "../features/teachers/TeacherSlice";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const ProductSchema = Yup.object().shape({
  classId: Yup.string().required("Class không được để trống!!!"),
  teacherId: Yup.string().required("Teacher không được để trống!!!"),
  moduleId: Yup.string().required("Module không được để trống!!!"),
  timeStart: Yup.date().required("Thời gian không được để trống!!!"),
});

// eslint-disable-next-line react/prop-types
function AddSchedule({ setReload, reload }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => setOpenModal(false);
  const [openModal, setOpenModal] = useState(false);
  const [clas, setClas] = useState([]);
  const teachers = useSelector((state) => state.teachers.teachers);
  const fetchStatus = useSelector((state) => state.teachers.status);
  const [keyword, setKeyword] = useState("");
  const [moduleCourse, setModuleCourse] = useState([]);

  const [course, setCourse] = useState(null);
  const [courseId, setcourseId] = useState(0);
  const [classId, setclassId] = useState(0);

  const [error, setError] = useState("");
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
      setModuleCourse([]);
      setCourse([]);
    }
  };

  useEffect(() => {
    getCApi("/classes", setClas);
    // getCApi("/module-courses", setModuleCourse);
    if (fetchStatus === "idle") {
      dispatch(fetchTeacher({ page: 0, size: 10, keyword }));
    }
  }, [reload, fetchStatus]);

  useEffect(() => {
    if (courseId > 0) {
      getCApi("/courses/" + courseId, setCourse);
      getCApi("/module-courses/" + courseId, setModuleCourse);
    }
  }, [courseId]);

  return (
    <>
      {/* Modal toggle */}
      {error && (
        <Alert
          color="failure"
          icon={HiInformationCircle}
          onDismiss={() => setError("")}
        >
          <span className="font-medium">{error}</span>
        </Alert>
      )}
      <Button onClick={() => setOpenModal(true)}>Thêm mới</Button>
      <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Thêm module mới
            </h3>

            <Formik
              initialValues={{
                classId: "",
                teacherId: "",
                moduleId: "",
                timeStart: "",
              }}
              validationSchema={ProductSchema}
              onSubmit={(values, actions) => {
                Modal1.confirm({
                  title: "Xác nhận thêm lớp học",
                  content: "Bạn chắc chắn với hành động này?",
                  onOk: async () => {
                    console.log(values);
                    await createCApi("/schedule", values, setError);
                    setReload(!reload);
                    setOpenModal(false);
                  },
                  onCancel: () => {},
                });
              }}
            >
              {(props) => (
                <Form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="classId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Class
                      </label>

                      <select
                        name="classId"
                        id="classId"
                        value={props.values.classId} // Đảm bảo giá trị được chọn được đồng bộ với giá trị trong Formik initialValues
                        onChange={(e) => {
                          props.handleChange(e); // Cập nhật giá trị
                          handleClassChange(e);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        // required=""
                      >
                        <option value={0}>Chọn lớp</option>
                        {clas.map((cls) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.name}
                          </option>
                        ))}
                      </select>

                      <ErrorMessage
                        name="classId"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="teacherId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Teacher
                      </label>

                      <select
                        name="teacherId"
                        id="teacherId"
                        value={props.values.teacherId} // Đảm bảo giá trị được chọn được đồng bộ với giá trị trong Formik initialValues
                        onChange={(e) => {
                          props.handleChange(e); // Cập nhật giá trị
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        // required=""
                      >
                        <option value="">Chọn thầy giáo</option>
                        {teachers.map((t) => (
                          <option key={t.instructorId} value={t.instructorId}>
                            {t.name}
                          </option>
                        ))}
                      </select>

                      <ErrorMessage
                        name="teacherId"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="moduleId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        MODULE HỌC
                      </label>

                      <select
                        name="moduleId"
                        id="moduleId"
                        value={props.values.moduleId} // Đảm bảo giá trị được chọn được đồng bộ với giá trị trong Formik initialValues
                        onChange={(e) => {
                          props.handleChange(e); // Cập nhật giá trị
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        // required=""
                      >
                        <option value="">Chọn module học</option>
                        {moduleCourse.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.moduleName}
                          </option>
                        ))}
                      </select>

                      <ErrorMessage
                        name="moduleId"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="timeStart"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        THỜI GIAN BẮT ĐẦU
                      </label>

                      <Field
                        type="date"
                        name="timeStart"
                        id="timeStart"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                      <ErrorMessage
                        name="timeStart"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Thêm lịch học
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default AddSchedule;
