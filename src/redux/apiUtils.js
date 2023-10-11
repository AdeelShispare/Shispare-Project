
export default async function fetchData({ method, url, body, headers }) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}
