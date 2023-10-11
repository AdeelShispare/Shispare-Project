import axios from "axios";

export const fetchData = async (method, url) => {
  try {
    const response = await axios({
      method: method,
      url: url,
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.data; 
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}
