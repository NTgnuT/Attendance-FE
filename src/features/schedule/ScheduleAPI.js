import axiosInstance from "../../common/api/axiosConfig";
export const remove = (id) => {
  return axiosInstance.delete(`/api/schedule/${id}`);
};
