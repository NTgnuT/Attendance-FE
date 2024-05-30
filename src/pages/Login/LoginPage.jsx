import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "/src/features/auth/authSlice.js";
import { Pagination } from "antd";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import DetailPost from "./../../components/DetailPost";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  fetchPosts,
  selectAllPosts,
  selectPagination,
} from "../../features/post/PostSlice.js";

const ProductSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống!!!"),
  password: Yup.string().required("Password không được để trống!!!"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = useState([]);
  const status = useSelector((state) => state.login.status);
  const navigate = useNavigate();

  const posts = useSelector(selectAllPosts);
  const { page, size, totalItems } = useSelector(selectPagination);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({ page, size }));
  }, [dispatch, reload, page, size]);

  const handlePageChange = (page, size) => {
    dispatch(fetchPosts({ page: page - 1, size }));
  };

  useEffect(() => {
    if (status === "succeeded") {
      window.location.href = "/StudentManagement";
    }
  }, [status]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch("/api/announcements");
      const data = await response.json();
      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);

  return (
    <main className="flex justify-center rounded-2xl max-md:px-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 w-3/4">
        <section className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
          <div className="mb-5">
            <h2 className="text-xl font-bold mb-3">Thông báo mới nhất</h2>
            <table className="table-auto w-full bg-white shadow-md rounded-md ">
              <thead>
                <tr>
                  <th className="px-4 py-2 w-3/4">Tiêu đề</th>
                  <th className="px-4 py-2 w-1/4">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{post.name}</td>
                    <td className="px-4 py-2">
                      <DetailPost data={post} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              current={page + 1}
              pageSize={size}
              total={totalItems}
              onChange={handlePageChange}
            />
          </div>
        </section>

        <section className="flex flex-col w-[35%] max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-5 items-start text-3xl font-bold leading-9 text-slate-900 max-md:mt-10">
            <div className="flex flex-col grow shrink-0 self-start shadow-sm basis-0 w-fit">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0855679b3d6ac009e1be3ce5645df8568f7ddea1f5354caf64c14d2bd0383ad?apiKey=a365ccf4d9914ba4a3de4c73152edf03&"
                alt="Rikkei logo"
                className="max-w-full aspect-[2.94] w-[200px]"
              />
              <h1 className="mt-14 mr-14 max-md:mt-10 text-4xl">
                Welcome to <br /> RikkeiEdu LMS
              </h1>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b44504f6bafce94215c89c237baedc99e9c2fc8c976ccfa45e6bd2fca411659?apiKey=a365ccf4d9914ba4a3de4c73152edf03&"
                alt="Decorative image"
                className="mt-14 w-full aspect-[0.99] max-md:mt-10"
              />
            </div>
          </div>
        </section>

        <section className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={ProductSchema}
            onSubmit={(values) => {
              dispatch(loginUser(values));
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col self-stretch my-auto text-sm font-medium text-gray-600 max-md:mt-10">
                <label
                  htmlFor="email"
                  className="text-base leading-8 text-slate-900"
                >
                  Email
                </label>
                <div className="flex gap-4 px-4 py-4 mt-3.5 whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200 leading-[214%]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57e9339cc52dfc743fba60af9f92daa9bd44fc82e9670e1706f94650550a9f59?apiKey=a365ccf4d9914ba4a3de4c73152edf03&"
                    alt="Email icon"
                    className="shrink-0 aspect-square w-[18px]"
                  />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    className="flex-auto"
                  />
                </div>
                {errors.email && touched.email ? (
                  <div className="text-red-600 text-sm">{errors.email}</div>
                ) : null}

                <label
                  htmlFor="password"
                  className="mt-7 text-base leading-8 text-slate-900"
                >
                  Password
                </label>
                <div className="flex gap-5 justify-between px-4 py-4 mt-3.5 w-full whitespace-nowrap bg-white rounded-md border border-solid border-zinc-200">
                  <div className="flex gap-4">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/94785be237ccd3c019b1f4d221882faf3f567a4350feebdf28bdb006fb985c31?apiKey=a365ccf4d9914ba4a3de4c73152edf03&"
                      alt="Password icon"
                      className="shrink-0 aspect-square w-[18px]"
                    />
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="*************"
                      className="my-auto"
                    />
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d4a63ec8df325c4e0a7aba4f998e103f96c4922ff15d6aa70df2580a346e8ff?apiKey=a365ccf4d9914ba4a3de4c73152edf03&"
                    alt="Show password icon"
                    className="shrink-0 aspect-square w-[18px]"
                  />
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                ) : null}

                <button
                  type="submit"
                  className="justify-center items-center px-20 py-2 mt-5 text-base leading-8 text-center text-white bg-red-700 rounded-md max-md:px-5"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
          <a href="#" className="self-center mb-5 text-center leading-[214%]">
            Forgot password?
          </a>
          <p className="self-center mb-10 leading-8 text-center">
            Bạn không có tài khoản?{" "}
            <a href="#" className="text-red-700">
              Tạo tài khoản
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
