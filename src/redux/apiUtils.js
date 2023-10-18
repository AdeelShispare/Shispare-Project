import axios from "axios";

export const fetchData = async (method, url,headers ) => {
  try {
    const response = await axios({
       method:method,
       url:url, 
       headers:headers,
     
  }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data; 
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}

export const addDepart = async (method, url, headers, data ) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
      data: data, 
    });

    if (response.status !== 201) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};


export const deleteDepart = async (method, url, headers) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      headers: headers,
     
    });

    // if (response.status !== 204) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    return response.data;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

