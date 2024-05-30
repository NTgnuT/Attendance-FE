import axiosInstance from "../../common/api/axiosConfig";

export const findAll = (
  page,
  size,
  sort = "id",
  order = "desc",
  keyword = ""
) => {
  return axiosInstance.get(
    `/api/post?page=${page}&size=${size}&sort=${sort}&order=${order}&keyword=${keyword}`
  );
};

export const edit = (id, data) => {
  return axiosInstance.put(`/api/post/${id}`, data);
};

export const add = (data) => {
  return axiosInstance.post("/api/post", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const remove = (id) => {
  return axiosInstance.delete(`/api/post/${id}`);
};

export const getPostById = (id) => {
  return axiosInstance.get(`/api/post/${id}`);
};
