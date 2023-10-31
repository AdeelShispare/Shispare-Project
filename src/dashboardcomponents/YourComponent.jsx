import React, { useEffect, useState } from 'react';

function YourComponent() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.228.165.0/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Data</h1>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Status:</strong> {userData.status}</p>
      <p><strong>Created At:</strong> {userData.created_at}</p>
      <p><strong>Updated At:</strong> {userData.updated_at}</p>
      <p><strong>Department:</strong> {userData.department?.department || 'N/A'}</p>
      <p><strong>Designation:</strong> {userData.designation?.designation || 'N/A'}</p>
      <p><strong>Project:</strong> {userData.project?.project || 'N/A'}</p>
      <p><strong>Reports To:</strong> {userData.reports_to?.name || 'N/A'}</p>
    </div>
  );
}

export default YourComponent;
