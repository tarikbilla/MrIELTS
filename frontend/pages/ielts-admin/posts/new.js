import dynamic from 'next/dynamic';
import React from 'react';

import { useContext, useState, useEffect } from "react";
import { useToast } from '../../../contexts/AdminContextProvider';
import Select from 'react-select';
import axios from "axios";
import Image from "next/image";
import { useUserContext } from "../../../contexts/UserContext";

const CKEditorForBlog = dynamic(
  () => import('../../../components/dashboard/global/ckEditorForBlog'),
  { ssr: false }
);

// include config file
const configData = require('../../../config');
const apiUrl = configData.getApiUrl();



export default function PostNewPage() {
  const { user } = useUserContext();

  const { successToast, failedToast, warningToast } = useToast();
  const [postTitle, setPostTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [postSlug, setPostSlug] = useState('');

  // file change
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // CK editor
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [postDescription, setData] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    setPostTitle(title);

    // Automatically generate and set the slug based on the title
    const generatedSlug = slugify(title);
    setPostSlug(generatedSlug);
  };



  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // Image preview after change upload
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

  // existing category for select options
  const [existingCategories, setExistingCategories] = useState([]);
  useEffect(() => {
    // Fetch existing categories when the component mounts
    async function fetchCategories() {
      try {
        const response = await axios.get(`${apiUrl}/api/post-categories`);
        setExistingCategories(response.data); // Assuming the API response is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts


  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const formData = new FormData();
      formData.append('postTitle', postTitle);
      formData.append('postDescription', postDescription);
      formData.append('postCategoryID', selectedCategory ? selectedCategory.value : null);
      formData.append('postSlug', postSlug);
      formData.append('createdByUserID', user.userId);

      // If you need to upload the image file, add it to the form data
      if (selectedImageFile) {
        formData.append('postThumbnail', selectedImageFile);
      }

      // Make a POST request to your Express.js server using the Fetch API
      const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        successToast('New Post created successfully');
        // setPostTitle('');
        // setSelectedCategory(null);
        // setPostSlug('');
        // setData('');
        // setSelectedImageFile(null);
        // router.push('/ielts-admin/posts/new');

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
        <h2 className="text-4xl font-extrabold dark:text-white my-8">Add New Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6 max-w-xl">
            <label htmlFor="postTitle" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              value={postTitle}
              onChange={handleTitleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Title Here..."
              required
            />
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postDescription" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Description
            </label>


            <CKEditorForBlog
              name="postDescription"
              value={postDescription}
              onChange={(postDescription) => {
                setData(postDescription);
              }}
              editorLoaded={editorLoaded} />
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="parentCatType" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Select Category  <span className="text-red-500">*</span>
            </label>
            {isClient && <Select // Only render Select if isClient is true
              id="parentCategory"
              name="parentCategory"
              options={existingCategories.map((category) => ({
                value: category.post_cat_id,
                label: `${category.post_cat_id}. ${category.post_cat_name}`,
              }))}
              value={selectedCategory}
              onChange={(selectedOption) => setSelectedCategory(selectedOption)}
              placeholder="Search or select parent category..."
              required
            />}
          </div>

          <div className="mb-6 max-w-5xl">
            <label htmlFor="postSlug" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Post Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postSlug"
              name="postSlug"
              value={postSlug}
              onChange={(e) => setPostSlug(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Post Slug Here..."
              required
            />
          </div>

          <div className="mb-6 max-w-5xl">
            <div>
              {selectedImage && (
                <div className="my-4">
                  <Image height="100" width="100" src={selectedImage} alt="Selected" className="w-48 rounded" />
                </div>
              )}
              <label className="block text-gray-700 text-md font-semibold">Upload Thumbnail (1200 X 675) px:</label>
              <input
                type="file"
                id="postThumbnail"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 mb-4"
              />
            </div>
          </div>

          <div className="my-6 text-right  max-w-5xl">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-3 text-center mr-2 mb-2"
            >
              Add New Store
            </button>
          </div>
        </form>
      </div>
    </>
  );
};


