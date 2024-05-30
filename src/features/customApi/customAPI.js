import axios from "axios";

const URLAPI = "http://localhost:8080/user-management/api";

export const getCApi = async (str, setData) => {
  const response = await axios.get(URLAPI + str);
  console.log("Data trả ra:");
  console.log(response.data);
  setData(response.data);
};

export const createCApi = async (str, values, setError) => {
  const response = await axios
    .post(URLAPI + str, values)
    .then((response) => {
      console.log("Phản hồi từ máy chủ:", response.data);
    })
    .catch((error) => {
      console.error("Lỗi:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
    });
};

export const postAndGetData = async (str, values, setData, setError) => {
  const response = await axios
    .post(URLAPI + str, values)
    .then((response) => {
      console.log("Data trả ra:");
      console.log(response.data);
      setData(response.data);
    })
    .catch((error) => {
      console.error("Lỗi:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
    });
};
