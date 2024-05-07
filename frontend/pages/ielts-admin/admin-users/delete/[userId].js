import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useToast } from '../../../../contexts/AdminContextProvider';

// include config file
const configData = require('../../../../config');
const apiUrl = configData.getApiUrl();

export default function DeleteStore() {
  const router = useRouter();
  const { userId } = router.query;

  const { successToast, failedToast, warningToast } = useToast();

  useEffect(() => {
    // Check if userId is available
    if (userId) {
      // You can perform your deletion logic here, e.g., send a DELETE request to your API
      fetch(`${apiUrl}/api/admin-users/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          successToast('Store deleted successfully');
          // Handle the deletion success and redirect
          router.push('/ielts-admin/admin-users'); // Redirect to the users list
        })
        .catch((error) => {
          console.error('Error deleting store:', error);
          // Handle the deletion failure
          // You might want to display an error message or take other actions
        });
    }
  }, [router, userId, successToast]);

  // You can also display a loading message or other content while the deletion is in progress
  return (
    <div>
      <p>Deleting store...</p>
    </div>
  );
}
