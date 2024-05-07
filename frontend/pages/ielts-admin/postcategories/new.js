import { useContext, useState } from "react";
import { useToast } from '../../../contexts/AdminContextProvider';
// include config file
const configData = require('../../../config');
const apiUrl = configData.getApiUrl();
import { useUserContext } from "../../../contexts/UserContext";


export default function PostCatNewPage() {
  const { user } = useUserContext();

  const [postCatName, setPostCatName] = useState('');
  const [postCatDescription, setPostCatDescription] = useState('');
  const [postCatSlug, setPostCatSlug] = useState('');

  const { successToast, failedToast, warningToast } = useToast();

  const slugify = text =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-'); // Replace multiple - with single -

  // Update the postTitle change handler
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setPostCatName(title);

    // Automatically generate and set the slug based on the title
    const generatedSlug = slugify(title);
    setPostCatSlug(generatedSlug);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('postCatName', postCatName);
      formData.append('postCatDescription', postCatDescription);
      formData.append('postCatSlug', postCatSlug);
      formData.append('createdByUserID', user.userId); // Replace with the actual user ID

      // Make a POST request to your Express.js server using the Fetch API
      const response = await fetch(`${apiUrl}/api/post-categories`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        successToast('New Post Category created successfully');
        setPostCatName('');
        setPostCatDescription('');
        setPostCatSlug('');
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
        <h2 className="text-4xl font-extrabold dark:text-white my-8">Add New Post Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 max-w-xl">
            <label htmlFor="postCatName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postCatName"
              name="postCatName"
              value={postCatName}
              onChange={handleTitleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Category Title Here..."
              required
            />
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postCatDescription" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Category Description
            </label>
            <textarea
              id="postCatDescription"
              name="postCatDescription"
              value={postCatDescription}
              onChange={(e) => setPostCatDescription(e.target.value)}
              rows="4"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Category Description Here..."
            ></textarea>
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postCatSlug" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Category Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postCatSlug"
              name="postCatSlug"
              value={postCatSlug}
              onChange={(e) => setPostCatSlug(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Category Slug Here..."
              required
            />
          </div>

          <div className="my-6 text-right  max-w-5xl flex justify-between">
            <a className="font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2" href={'/ielts-admin/postcategories'}>&larr; Back To Categorys</a>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Add New Type
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


