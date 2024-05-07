import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useToast } from '../../../../contexts/AdminContextProvider';

// include config file
const configData = require('../../../../config');
const apiUrl = configData.getApiUrl();

export default function DeleteStore() {
  const router = useRouter();
  const { postCatId } = router.query;

  const { successToast, failedToast, warningToast } = useToast();

  useEffect(() => {
    // Check if postCatId is available
    if (postCatId) {
      // You can perform your deletion logic here, e.g., send a DELETE request to your API
      fetch(`${apiUrl}/api/post-categories/${postCatId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          successToast('Category  deleted successfully');
          // Handle the deletion success and redirect
          router.push('/ielts-admin/postcategories'); // Redirect to the stores list
        })
        .catch((error) => {
          console.error('Error deleting category :', error);
          // Handle the deletion failure
          // You might want to display an error message or take other actions
        });
    }
  }, [postCatId, router, successToast]);

  // You can also display a loading message or other content while the deletion is in progress
  return (
    <div>
      <p>Deleting category s...</p>
    </div>
  );
}
