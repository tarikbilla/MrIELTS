import { useContext, useState } from "react";
import { useToast } from '../../../contexts/AdminContextProvider';
import { useUserContext } from "../../../contexts/UserContext";
// include config file
const configData = require('../../../config');
import Image from "next/image";
const apiUrl = configData.getApiUrl();


export default function UsersNewPage() {
  const { user } = useUserContext();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userRole, setUserRole] = useState(''); // Added userRole state
  const [showPassword, setShowPassword] = useState(false);

  const { successToast, failedToast } = useToast();

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
      formData.append('createByUserID', user.userId); // Append userRole to formData

      if (selectedImageFile) {
        formData.append('profilePicture', selectedImageFile);
      }

      const response = await fetch(`${apiUrl}/api/admin-users`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        successToast('New user created successfully');
        location.reload();
      } else {
        const errorData = await response.json();
        if (errorData && errorData.sqlMessage) {
          failedToast(`Error: ${errorData.sqlMessage}`);
        } else {
          failedToast('An error occurred. Please try again later.');
        }
      }
    } catch (error) {
      failedToast('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="my-8">
        <h2 className="text-4xl font-extrabold dark:text-white my-8">Add New User</h2>
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
              <input id="showPass" type="checkbox" value="" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
            </div>
            <label for="showPass" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
          </div>

          <div className="mb-6 max-w-5xl">
            <div>
              {selectedImage && (
                <div className="my-4">
                  <Image height="100" width="192" src={selectedImage} alt="Selected" className="w-48 rounded" />
                </div>
              )}
              <label className="block text-gray-700 text-md font-semibold">Profile Picture:</label>
              <input
                type="file"
                id="storeLogo"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 mb-4"
              />
            </div>
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
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Member">Member</option>
            </select>
          </div>


          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label for="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
          </div>

          <div className="my-6 text-right  max-w-5xl">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Add New User
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


