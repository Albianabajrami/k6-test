import { config } from "./config.js";
import http from "k6/http";
import { sleep, check } from "k6";

export function getUsers() {
  const url = `${config.apiBaseUrl}/users?page=1&limit=10`;
  const response = http.get(url, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    //'count users should be 1': () => jsonRes.length > 1,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function postUser() {
  const fakeUser = {
    firstname: getName(),
    lastname: getName(),
    username: `${getName()}123`,
    email: getRandomEmail(),
    password: "test123",
    role: "user",
  };
  const url = `${config.apiBaseUrl}/users`;

  const payload = JSON.stringify(fakeUser);

  const response = http.post(url, payload, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}

export function updateUsers() {
    const randomId = Math.floor(Math.random() * (200 - 2 + 1)) + 2;
    const url = `${config.apiBaseUrl}/users/${randomId}`;

  const payload = JSON.stringify({
    firstname: `Test name ${randomId}`,
    lastname: `Test lastname ${randomId}`,
    username: `usernametest${randomId}`,
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

export function deleteUsers() {
    const randomId = Math.floor(Math.random() * (100 - 2 + 1)) + 2;

  const url = `${config.apiBaseUrl}/users/${randomId}`;
  
  const response = http.del(url, null, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
    "is status 404 (Not Found)": (r) => r.status === 404,
  });

  sleep(1);

  return response;
}

function getRandomEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let email = '';
    for (let i = 0; i < 10; i++) {
        email += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return email + '@example.com';
}

function getName() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let name = '';
    for (let i = 0; i < 8; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}
