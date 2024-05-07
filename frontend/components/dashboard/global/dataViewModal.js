'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'flowbite-react';

export default function DataViewModal({ text, data }) {
  const [openModal, setOpenModal] = useState();

  return (
    <>
      <button className="" onClick={() => setOpenModal('pop-up')} title='Click here to view details'>
        {text}
      </button>
      <Modal show={openModal === 'pop-up'} size="2xl" popup onClose={() => setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="p-0">
            <div dangerouslySetInnerHTML={{ __html: data }}></div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
