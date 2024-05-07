import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useToast } from '../../../../contexts/AdminContextProvider';
import Image from "next/image";
// include config file
const configData = require('../../../../config');
const apiUrl = configData.getApiUrl();

export default function UsersNewPage() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [userRole, setUserRole] = useState(''); // Added userRole state
  const [selectedImage, setSelectedImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { userId } = router.query;
  const { successToast, failedToast } = useToast();

  useEffect(() => {
    // Fetch the user data for editing
    if (userId) {
      fetch(`${apiUrl}/api/admin-users/u/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setFullName(data.username);
          setUsername(data.username);
          setUserEmail(data.email);
          setUserRole(data.user_role);
          // Set the existing image for display
          setExistingImage(data.user_avatar);
        })
        .catch((error) => console.error('Error fetching User data:', error));
    }
  }, [userId]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('username', username);
      formData.append('userEmail', userEmail);
      formData.append('userPassword', userPassword);
      formData.append('userRole', userRole); // Append userRole to formData

      if (selectedImageFile) {
        formData.append('profilePicture', selectedImageFile);
      } else {
        // No new image selected, update with the existing image
        formData.append('profilePicture', existingImage);
      }

      const response = await fetch(`${apiUrl}/api/admin-users/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 200) {
        successToast('New User Updated successfully');
      } else if (response.status === 500) {
        const errorData = await response.json();
        if (errorData && errorData.sqlMessage) {
          failedToast(`Error: ${errorData.sqlMessage}`);
        } else {
          failedToast('An error occurred. Please try again later.');
        }
      } else {
        failedToast('An error occurred. Please try again later.');
      }
    } catch (error) {
      failedToast('An error occurred. Please try again later.');
    }
  };


  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userPassword', userPassword);

      const response = await fetch(`${apiUrl}/api/admin-users/password/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.status === 200) {
        successToast('Password Updated successfully');
      } else if (response.status === 500) {
        const errorData = await response.json();
        if (errorData && errorData.sqlMessage) {
          failedToast(`Error: ${errorData.sqlMessage}`);
        } else {
          failedToast('An error occurred. Please try again later.');
        }
      } else {
        failedToast('An error occurred. Please try again later.');
      }
    } catch (error) {
      failedToast('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="my-8">
        <h2 className="text-4xl font-extrabold dark:text-white my-8">Edit User</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6 max-w-xl">
            <label htmlFor="fullName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Full Name Here..."
            />
          </div>

          <div className="mb-6 max-w-xl">
            <label htmlFor="username" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              rows="4"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Username Here..."
              disabled
            />
          </div>

          <div className="mb-6 max-w-xl">
            <label htmlFor="userEmail" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <div className="flex">
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Email Here..."
              />
            </div>
          </div>

          <div className="mb-6 max-w-5xl">
            {existingImage && (
              <div className="my-4">
                <label className="block text-gray-700 text-md font-semibold mb-2">Existing Image:</label>
                <Image height="100" width="192" src={`${apiUrl}/uploads/users/${existingImage}`} alt="Existing" className="w-48 rounded border p-2" />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-md font-semibold">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 mb-4"
              />
            </div>
            {selectedImage && (
              <div className="my-4">
                <Image height="100" width="192" src={selectedImage} alt="Selected" className="w-48 rounded border p-2" />
              </div>
            )}
          </div>


          <div className="mb-6 max-w-5xl">
            <label htmlFor="userRole" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Roles</label>
            <select
              id="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-5xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="">Please Select</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="member">Member</option>
            </select>
          </div>

          <div className="my-6 mt-12 max-w-5xl">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Update User Data
            </button>
          </div>
        </form>
      </div>

      <hr />

      {/* update password */}
      <div className="my-8">
        <h2 className="text-4xl font-extrabold dark:text-white my-8">Change Password</h2>
        <form onSubmit={updatePassword} encType="multipart/form-data">
          <div className="mb-6 max-w-xl">
            <label htmlFor="userPassword" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="userPassword"
              name="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Password Here..."
              required
            />
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="showPass"
                type="checkbox"
                value=""
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} // Toggle the state
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="showPass"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Show Password
            </label>
          </div>
          <div className="my-6 max-w-5xl">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Update Password
            </button>
          </div>
        </form >
      </div >

    </>
  );
};


