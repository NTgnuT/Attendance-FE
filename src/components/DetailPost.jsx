import { Button, Modal, Table } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPost } from "../features/post/PostSlice.js";
import { Document, Page, pdfjs } from "react-pdf";

// Cấu hình cho react-pdf để sử dụng worker để tải và hiển thị file PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DetailPost({ data }) {
  const [openModal11, setOpenModal11] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal11(true);
    dispatch(fetchPost(data?.id));
  };

  // Kiểm tra kiểu dữ liệu của data.content
  const isImage = data?.content?.match(/\.(jpeg|jpg|gif|png)$/) != null;

  return (
    <>
      <Button className="" onClick={handleOpenModal}>
        Xem
      </Button>
      <Modal show={openModal11} onClose={() => setOpenModal11(false)}>
        <Modal.Header className="p-4">{data.name}</Modal.Header>{" "}
        {/* Sử dụng biến tableTitle cho tiêu đề của bảng */}
        <Modal.Body>
          <div className="overflow-x-auto">
            <Table>
              <td>
                {isImage ? (
                  <img
                    src={data?.content}
                    alt="Image"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <div style={{ overflow: "auto", maxWidth: "100%" }}>
                    <Document file={data?.content}>
                      <style>
                        {`.react-pdf__Page__textContent {display: none;}`}
                      </style>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                )}
              </td>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
