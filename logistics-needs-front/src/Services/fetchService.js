function ajax(url, requestMethod, jwt, requestBody) {
    const fetchData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: requestMethod,
    };
  
    if (jwt) {
      fetchData.headers.Authorization = `${jwt}`;
    }
  
    if (requestBody) {
      fetchData.body = JSON.stringify(requestBody);
    }
  
    return fetch(url, fetchData).then((response) => {
      if (response.status === 200) {
        const body = response.json();
        console.log(body);
        return body;
      }
    });
  }
  
  export default ajax;