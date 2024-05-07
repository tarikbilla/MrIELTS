'use client';
import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';
import 'datatables.net-bs5';
import PopUpModal from '../../../components/dashboard/global/confirmationModal';
import { useToast } from '../../../contexts/AdminContextProvider';
// include config file
const configData = require('../../../config');
const apiUrl = configData.getApiUrl();



function PostCategories() {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);
    const { successToast, failedToast, warningToast } = useToast();
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal


    useEffect(() => {
        fetch(`${apiUrl}/api/post-categories`)
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
            <h2 className="text-4xl font-extrabold dark:text-white my-8">All Category Data</h2>
            <a href={'/ielts-admin/postcategories/new'} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-4 inline-block'>Add New Category</a>
            <div className='relative overflow-x-auto cattypetable dateTable'>
                <table className="table table-striped table-bordered w-full display" ref={tableRef}>
                    <thead>
                        <tr className="p-4">
                            <th>ID</th>
                            <th>Categories Name</th>
                            <th>Categories Description</th>
                            <th>Categories Slug</th>
                            <th>Posts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((row) => (
                                <tr className="py-4" key={row.post_cat_id}>
                                    <td>{row.post_cat_id}</td>
                                    <td>{row.post_cat_name}</td>
                                    <td>{row.post_cat_description.substring(0, 40) + '...'}</td>
                                    <td>{row.post_cat_slug }</td>
                                    <td>{0}</td>
                                    <td>
                                        <a className="me-2 text-blue-600" href={`/ielts-admin/postcategories/edit/${row.post_cat_id}`}>Edit</a>
                                        <PopUpModal
                                            message="Are you sure you want to delete this post category?"
                                            confirmURL={`/ielts-admin/postcategories/delete/${row.post_cat_id}`}
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

export default PostCategories;
