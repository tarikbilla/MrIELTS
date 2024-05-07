'use client';
import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';
import Image from "next/image";
import 'datatables.net-bs5';
import PopUpModal from '../../../components/dashboard/global/confirmationModal';
import { useToast } from '../../../contexts/AdminContextProvider';
import DataViewModal from '../../../components/dashboard/global/dataViewModal';
// include config file
const configData = require('../../../config');
const apiUrl = configData.getApiUrl();



function Posts() {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);
    const { successToast, failedToast, warningToast } = useToast();
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal


    useEffect(() => {
        fetch(`${apiUrl}/api/posts`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);


    useEffect(() => {
        if (!loading && Array.isArray(data) && data.length > 0) {
            const $table = $(tableRef.current);
            // Check if the DataTable is already initialized and destroy it
            if ($.fn.DataTable.isDataTable($table)) {
                $table.DataTable().destroy();
            }
            // Initialize DataTable on the client side
            $table.DataTable({"order": [[0, 'desc']]});
        }
    }, [loading, data]);

    return (
        <>
            <h2 className="text-4xl font-extrabold dark:text-white my-8">All Posts</h2>
            <div className='relative overflow-x-auto postsdatatable dateTable'>
                <table className="table table-striped table-bordered w-full display" ref={tableRef}>
                    <thead>
                        <tr className="p-4">
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Post Title</th>
                            <th>Post Description</th>
                            <th>Post Slug</th>
                            <th>Category</th>
                            <th>Post by User</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((row) => (
                                <tr className="py-4" key={row.postID}>
                                    <td>{row.postID }</td>
                                    <td>
                                        {(row.featured_image != 'null') ? <Image height="100" width="100" src={`${apiUrl}/uploads/posts/${row.featured_image}`} alt="Post Thumbnail" /> : 'No Image'}

                                    </td>
                                    <td>{row.post_title}</td>
                                    <td><DataViewModal text={row.post_content.substring(0, 10) + '...'} data={row.post_content} /></td>
                                    <td>{row.post_slug}</td>
                                    <td>{row.categoryID}</td>
                                    <td>{row.authorID}</td>
                                    <td>{row.status}</td>
                                    <td>
                                        <a className="me-2 text-blue-600" href={`/ielts-admin/posts/edit/${row.postID}`}>Edit</a>
                                        <PopUpModal
                                            message="Are you sure you want to delete this Post?"
                                            confirmURL={`/ielts-admin/posts/delete/${row.postID}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Posts;
