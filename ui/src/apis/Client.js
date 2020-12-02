import axios from 'axios';

export function getSummary(cb) {
  return fetch(`/api/summary`, {
    accept: 'application/json',
  })
    .then(parseJSON)
    .then(cb);
}

function parseJSON(response) {
  return response.json();
}
