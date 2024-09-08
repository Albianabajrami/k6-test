import { config } from "./config.js";
import http from "k6/http";
import { sleep, check } from "k6";

export function getBooks() {
  const url = `${config.apiBaseUrl}/books?page=1&limit=1000&order=desc`;
  const response = http.get(url, { headers: config.headers });
  
const body = response.body as string;

const responseBody = JSON.parse(body);

  check(response, {
    "is status 200": (r) => r.status == 200,
    'has more than 10 items': (r) => responseBody.data.length >= 10,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function postBooks() {
  const book = {
    bookTitle: getName(),
    author: getName(),
    isbn: `123`,
    photoPath: `null`,
    
  };
  const url = `${config.apiBaseUrl}/books`;

  const payload = JSON.stringify(book);

  const response = http.post(url, payload, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function updateBooks() {
    const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;
    const url = `${config.apiBaseUrl}/books/${randomId}`;

  const payload = JSON.stringify({
    bookTitle: `Test name ${randomId}`,
    isbn: `${randomId}`,
  });
  const response = http.put(url, payload, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
    "is status 404 (Not Found)": (r) => r.status === 404,
  });

  sleep(1);

  return response;
}

export function deleteBooks() {
    const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;

  const url = `${config.apiBaseUrl}/books/${randomId}`;
  
  const response = http.del(url, null, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
    "is status 404 (Not Found)": (r) => r.status === 404,
  });

  sleep(1);

  return response;
}


function getName() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let name = '';
    for (let i = 0; i < 8; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}
