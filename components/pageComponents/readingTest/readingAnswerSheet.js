"use client";

import { Button, Modal, Badge, Table } from "flowbite-react";
import { useState } from "react";

export default function ReadingAnswerSheet(readingID) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Badge
        color="gray"
        onClick={() => setOpenModal(true)}
        className="px-2 border"
      >
        Show My Answer Sheet
      </Badge>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Answer Sheet</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <Table striped hoverable>
                <Table.Head>
                  <Table.HeadCell>Q.No</Table.HeadCell>
                  <Table.HeadCell>Your Answer</Table.HeadCell>
                  <Table.HeadCell>Currect Answer</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {'Apple MacBook Pro 17"'}
                    </Table.Cell>
                    <Table.Cell>Laptop</Table.Cell>
                    <Table.Cell>
                      <Badge color="success">Currect</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Microsoft Surface Pro
                    </Table.Cell>
                    <Table.Cell>Laptop PC</Table.Cell>
                    <Table.Cell>
                      <Badge color="failure">Wrong</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Magic Mouse 2
                    </Table.Cell>
                    <Table.Cell>Accessories</Table.Cell>
                    <Table.Cell>
                      <Badge color="success">Currect</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>4</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Google Pixel Phone
                    </Table.Cell>
                    <Table.Cell>Phone</Table.Cell>
                    <Table.Cell>
                      <Badge color="success">Currect</Badge>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>5</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Apple Watch 5
                    </Table.Cell>
                    <Table.Cell>Wearables</Table.Cell>
                    <Table.Cell>
                      <Badge color="failure">Wrong</Badge>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>

          <div className="mb-4">
            <div className="space-y-6">
            <h2 className="text-lg font-bold mt-4">Overview</h2>
              <Table hoverable>
                <Table.Body className="divide-y border">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-bold">Total Question</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      5
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-bold">Currect Answer</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      3
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-bold">Wrong Answer</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      2
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="font-bold">Your Scores</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      6
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Okay</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
