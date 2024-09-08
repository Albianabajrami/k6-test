import { config } from "./config.js";
import http from "k6/http";
import { sleep, check } from "k6";

export function login() {
  const url = `${config.apiBaseUrl}/auth/login`;

  const payload = JSON.stringify({
    email: "albiana.bajrami@abel.fit",
    password: "Albiana123",
  });

  const response = http.post(url, payload, { headers: config.headers });

  check(response, {
    "is status 200": (r) => r.status == 200,
    "response time is < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1);

  return response;
}
