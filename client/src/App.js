import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/categories');
        const responseData = response.data.data;
        setData(responseData);
        setLoading(false);
        console.log(responseData)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Domino Backend</h1>
      <h1>{data.length > 0 ? data[0].name : 'No data available'}</h1>
    </div>
  );
}

export default App;
