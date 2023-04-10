import React, { useState } from "react";
import { Button, Modal } from "antd";

const Modals = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendPostStatus,
}) => {
  return (
    <>
      <Modal
        title="Create New Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            onClick={sendPostStatus}
            disabled={status.length > 0 ? false : true}
            className="bg-blue-500 text-white"
          >
            Post
          </Button>,
        ]}
      >
        <input
          onChange={(e) => setStatus(e.target.value)}
          className="border-0 outline-none w-[80%]"
          type="text"
          placeholder="Write somthing what's on your mind?"
          value={status}
        />
      </Modal>
    </>
  );
};

export default Modals;
