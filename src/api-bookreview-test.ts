import { config } from "./config.js";
import http from "k6/http";
import { sleep, check } from "k6";

export function getBookReviews() {
  const url = `${config.apiBaseUrl}/bookReview?page=1&limit=10&order=desc`;
  const response = http.get(url, { headers: config.headers });

  const jsonRes = response.json() as any;

  check(response, {
    "is status 200": (r) => r.status == 200,
    "count users should be 1": () => jsonRes.length > 1,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function postBookReviews() {
  const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;
  const review = {
    userId: randomId,
    bookId: randomId,
    comment: getComment(),
    rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
  };
  const url = `${config.apiBaseUrl}/bookReview`;

  const payload = JSON.stringify(review);

  const response = http.post(url, payload, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function updateBookReviews() {
  const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;
  const url = `${config.apiBaseUrl}/bookReviews/${randomId}`;

  const payload = JSON.stringify({
    comment: getComment(),
    rating: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
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

export function deletebookReviews() {
  const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;

  const url = `${config.apiBaseUrl}/bookReview/${randomId}`;

  const response = http.del(url, null, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
    "is status 404 (Not Found)": (r) => r.status === 404,
  });

  sleep(1);

  return response;
}

function getComment() {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let name = "";
  for (let i = 0; i < 8; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}
