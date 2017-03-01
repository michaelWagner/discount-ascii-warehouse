
/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/products?limit=1`, {
    headers: {
      'Content-Type': 'application/x-json-stream',
      'Accept': 'application/x-json-stream'
    }
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log(response)
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
