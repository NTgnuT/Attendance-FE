import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Modal as Modal1 } from "antd";
import { Button, Modal } from "flowbite-react";
import { addPost } from "../features/post/PostSlice";
const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Tên bài viết không được để trống"),
  content: Yup.string().required("Nội dung bài viết không được để trống"),
});

// eslint-disable-next-line react/prop-types
function PostAddModal({ setReload, reload }) {
  const updateError = useSelector((state) => state.students.error);
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (updateError && formikRef.current) {
      formikRef.current.setErrors({
        name: updateError?.errorsDetails.name,
        content: updateError?.errorsDetails.content,
      });
    }
  }, [updateError]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Thêm mới</Button>
      <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Thêm bài viết mới
            </h3>
            <Formik
              enableReinitialize
              innerRef={formikRef}
              initialValues={{
                name: "",
                content: null,
              }}
              validationSchema={ProductSchema}
              onSubmit={(values, actions) => {
                Modal1.confirm({
                  title: "Xác nhận",
                  content: `Bạn có thực hiện hành động này`,
                  onOk: () => {
                    dispatch(addPost(values))
                      .unwrap()
                      .then(() => {
                        // actions.resetForm();
                        // document.getElementById("crud-modal-add").click();
                        setReload(!reload);
                        setOpenModal(false);
                      })
                      .catch(() => {
                        // console.log('error', err);
                      });
                  },
                  onCancel: () => {},
                });
              }}
            >
              {({ setFieldValue }) => (
                <Form className="p-4 md:p-5" encType="multipart/form-data">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tên bài viết
                      </label>

                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        File bài viết
                      </label>

                      <input
                        type="file"
                        id="file"
                        name="file"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(e) => {
                          const content = e.currentTarget.files[0];
                          setFieldValue("content", content);
                        }}
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Thêm
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default PostAddModal;
