import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToast } from '../../../../contexts/AdminContextProvider';

// include config file
const configData = require('../../../../config');
const apiUrl = configData.getApiUrl();


export default function StoreEditPage() {
  const [postCatName, setPostCatName] = useState('');
  const [postCatDescription, setPostCatDescription] = useState('');
  const [postCatSlug, setPostCatSlug] = useState('');

  const router = useRouter();
  const { postCatId } = router.query;
  const { successToast, failedToast, warningToast } = useToast();

  useEffect(() => {
    // Fetch the store data for editing
    if (postCatId) {
      fetch(`${apiUrl}/api/post-categories/c/${postCatId}`)
        .then((response) => response.json())
        .then((data) => {
          setPostCatName(data.post_cat_name);
          setPostCatDescription(data.post_cat_description);
          setPostCatSlug(data.post_cat_slug);
        })
        .catch((error) => console.error('Error fetching Category data:', error));
    }
  }, [postCatId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission and update the store
      const formData = new FormData();
      formData.append('postCatName', postCatName);
      formData.append('postCatDescription', postCatDescription);
      formData.append('postCatSlug', postCatSlug);
      formData.append('createdByUserID', 1); // Replace with the actual user ID

      const response = await fetch(`${apiUrl}/api/post-categories/${postCatId}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (response.status === 200) {
        successToast('Category Updated successfully');
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
      <h2 className="text-4xl font-extrabold dark:text-white my-8">Edit Post Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 max-w-xl">
            <label htmlFor="postCatName" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postCatName"
              name="postCatName"
              value={postCatName}
              onChange={(e) => setPostCatName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Category Title Here..."
              required
            />
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postCatDescription" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Category Description
            </label>
            <textarea
              id="postCatDescription"
              name="postCatDescription"
              value={postCatDescription}
              onChange={(e) => setPostCatDescription(e.target.value)}
              rows="4"
              className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Category Description Here..."
            ></textarea>
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postCatSlug" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Category Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postCatSlug"
              name="postCatSlug"
              value={postCatSlug}
              onChange={(e) => setPostCatSlug(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Category Slug Here..."
              required
            />
          </div>

          <div className="my-6 text-right  max-w-5xl flex justify-between">
            <a className="font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2" href={'/ielts-admin/postcategories'}>&larr; Back To Categorys</a>

            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
}