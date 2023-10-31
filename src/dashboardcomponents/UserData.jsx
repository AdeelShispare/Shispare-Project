import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserData() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Define headers with the authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make an HTTP GET request to the API endpoint with headers
    axios.get('http://13.228.165.0/api/users', { headers })
      .then((response) => {
        // Once the data is fetched, update the state
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  return (
    <div>
      <h1>User Data</h1>
      {userData ? (
        <div>
          {/* Render user data as before */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserData;
