import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import BodyHeader from "../../components/BodyHeader";
import { useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import DetailPost from "../../components/DetailPost.jsx";
import { Button } from "flowbite-react";
import PostAddModal from "../../components/PostAddModal.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPosts,
  selectAllPosts,
  selectPagination,
} from "../../features/post/PostSlice.js";
import EditPostModal from "../../components/EditPostModal.jsx";

function ClassManagement() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { page, size, totalItems } = useSelector(selectPagination);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({ page, size }));
  }, [dispatch, reload, page, size]);

  const handlePageChange = (page, size) => {
    dispatch(fetchPosts({ page: page - 1, size }));
  };

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
            <BodyHeader text={"Quản lý bài viết"} />
            <PostAddModal setReload={setReload} reload={reload} />
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tiêu đề
                  </th>
                  <th colSpan={3} className="text-center w-1/4">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {post.id}
                    </th>
                    <td className="px-6 py-4">{post.name}</td>
                    <td>
                      <DetailPost data={post} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        onClick={() => {
                          Modal.confirm({
                            title: "Xác nhận",
                            content: "Bạn có muốn thực hiện hành động này?",
                            onOk: () => {
                              dispatch(deletePost(post.id))
                                .then(() => {
                                  setReload(!reload);
                                })
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
                      <EditPostModal
                        data={post}
                        setReload={setReload}
                        reload={reload}
                      />
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
              // showSizeChanger
              // onShowSizeChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassManagement;
