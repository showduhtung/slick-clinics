export function getSummary(cb) {
  return fetch(`/api/summary`, {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

export function getClinics(cb) {
  return fetch(`/api/getClinics`, {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error);
  throw error;
}

function parseJSON(response) {
  return response.json();
}
