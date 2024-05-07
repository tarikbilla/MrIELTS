import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useToast } from '../../../../contexts/AdminContextProvider';

// include config file
const configData = require('../../../../config');
const apiUrl = configData.getApiUrl();

export default function Deletepost() {
  const router = useRouter();
  const { postID } = router.query;

  const { successToast, failedToast, warningToast } = useToast();

  useEffect(() => {
    // Check if postID is available
    if (postID) {
      // You can perform your deletion logic here, e.g., send a DELETE request to your API
      fetch(`${apiUrl}/api/posts/${postID}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          successToast('Post deleted successfully');
          // Handle the deletion success and redirect
          router.push('/ielts-admin/posts'); // Redirect to the posts list
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          // Handle the deletion failure
          // You might want to display an error message or take other actions
        });
    }
  }, [postID, router, successToast]);

  // You can also display a loading message or other content while the deletion is in progress
  return (
    <div>
      <p>Deleting post...</p>
    </div>
  );
}
