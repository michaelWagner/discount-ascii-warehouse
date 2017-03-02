/* eslint-disable no-undef */
function loadProducts(query, cb) {
  fetch(`api/products?${query}`, {
    headers: {
      'Content-Type': 'application/x-json-stream',
      'Accept': 'application/x-json-stream'
    }
  })
  .then(checkStatus)
  .then(response => response.text())
  .then(response => response.split('\n'))
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
  return response;
}

const Client = { loadProducts };
export default Client;
