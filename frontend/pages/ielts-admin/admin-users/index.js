'use client';
import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import $ from 'jquery';
import 'datatables.net-bs5';
import PopUpModal from '../../../components/dashboard/global/confirmationModal';
import { useToast } from '../../../contexts/AdminContextProvider';
import Image from "next/image";
// include config file
const configData = require('../../../config');
const apiUrl = configData.getApiUrl();



function Users() {
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableRef = useRef(null);
    const { successToast, failedToast, warningToast } = useToast();
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control the delete confirmation modal


    useEffect(() => {
        fetch(`${apiUrl}/api/admin-users`)
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
            <h2 className="text-4xl font-extrabold dark:text-white my-8">All Users</h2>
            <div className='relative overflow-x-auto usersdatatable dateTable'>
                <table className="table table-striped table-bordered w-full display" ref={tableRef}>
                    <thead>
                        <tr className="p-4">
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joining Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((row) => (
                                <tr className="py-4" key={row.usre_id}>
                                    <td>{row.user_id}</td>
                                    <td>
                                        {(row.user_avatar != null) ? <Image height="60" width="60" src={`${apiUrl}/uploads/users/${row.user_avatar}`} alt="Usre Image" className='rounded' /> : 'No Image'}
                                    </td>
                                    <td>{row.username}</td>
                                    <td>{row.email}</td>
                                    <td>{row.user_role}</td>
                                    <td>{row.user_registered_date}</td>
                                    <td>
                                        <a className="me-2 text-blue-600" href={`/ielts-admin/admin-users/edit/${row.user_id}`}>Edit</a>
                                        <PopUpModal
                                            message="Are you sure you want to delete this usre?"
                                            confirmURL={`/ielts-admin/admin-users/delete/${row.user_id}`}
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

export default Users;
