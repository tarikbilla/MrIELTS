'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';

export default function PopUpModal({ message, confirmURL, onConfirm, onCancel }) {
  const [openModal, setOpenModal] = useState();

  return (
    <>
      <button className="text-red-600" onClick={() => setOpenModal('pop-up')}>
        Delete
      </button>
      <Modal show={openModal === 'pop-up'} size="md" popup onClose={() => setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" href={confirmURL}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
