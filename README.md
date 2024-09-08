## Performance, Load and Stress testing with k6
This project demonstrates the use of `k6` to perform performance, load, and stress testing on a TypeScript-based application. The purpose is to simulate different traffic patterns and assess the application's stability and performance under various conditions. 

## Testing Overview

In this project, we performed three types of tests using `k6`:

### 1. **Performance Testing**
   - Performance testing is designed to determine how the system behaves under normal conditions and within expected user traffic.
   - We simulated various numbers of virtual users (VUs) to measure response times and the system’s overall responsiveness.

### 2. **Load Testing**
   - Load testing simulates increasing traffic to ensure that the application can handle the expected number of users and their requests.
   - We ran tests with gradually increasing VUs to understand how the system handles heavier loads over time.

### 3. **Stress Testing**
   - Stress testing is used to push the system beyond its limits by simulating an extreme number of users.
   - The purpose of this test is to determine the breaking point of the system, identify bottlenecks, and assess how the system recovers from failure conditions.


## Installation instructions
- **Node.js** (version: latest)
- **TypeScript**
- **Docker** (for running `k6` tests in a container)
- **k6** installed or using Docker (`grafana/k6`)

### Steps to Install:
1. Clone the repository:
   ```bash
   git clone https://github.com/Albianabajrami/BookReviewTest.git
   cd k6-test
   
## How to run tests indivitually?
The general command to run the tests is:

docker run --rm -v [Your path]/k6-test/build:/app -i grafana/k6 run /app/[Type of the test].js --env GROUP=[Name of the group] --env ENDPOINT=[Endpoint method]

### **Test scenatious and results**

Below are included some examples of test cases and results.

- Test type: Performance
- Endpoint: post
- Group: bookReviews
- Command: docker run --rm -v C:/Users/Albiana/Desktop/k6-test/build:/app -i grafana/k6 run /app/performance-test.js --env GROUP=bookReviews --env ENDPOINT=post


<b>Results:</b>

<img width="737" alt="image" src="https://github.com/user-attachments/assets/8a1d44ca-1523-4898-a91c-cd6f0a7be36d">


 During the performance testing, the following results were recorded:

- **HTTP Request Duration:**
  - Average: 45.51 ms
  - p(90): 65.82 ms
  - p(95): 72.32 ms
  - Max: 140.39 ms

- **Failure Rate:**
  - 7.08% requests failed (27 out of 381 total requests)

- **Checks:**
  - 96.45% success rate (735 passed checks, 27 failed checks)

- **Throughput:**
  - Requests per second: 14.67 req/s
  - Total requests completed: 381

- **Virtual Users (VU):**
  - Peak VUs: 30
  - VU ramp down: 0 after test completion

- **Data Transfer:**
  - Data Received: 544 kB
  - Data Sent: 173 kB

The test concluded with an average iteration duration of 1.04 seconds and maximum iteration duration of 1.15 seconds.


- Test type: Stress
- Endpoint: get
- Group: books
- Command: docker run --rm -v C:/Users/Albiana/Desktop/k6-test/build:/app -i grafana/k6 run /app/stress-test.js --env GROUP=books --env ENDPOINT=get

<b>Results:</b>

<img width="464" alt="image" src="https://github.com/user-attachments/assets/27f06e22-9607-4678-ad37-fcfdf3d43ef3">

During the spike/stress test with 99 virtual users, the following metrics were recorded:

- **HTTP Request Duration:**
  - Average: 19.38 ms
  - p(90): 18.86 ms
  - p(95): 23.34 ms
  - Max: 75.34 ms

- **Failure Rate:**
  - 0.00% requests failed (0 out of 6,122 total requests)

- **Checks:**
  - 100.00% success rate (18,366 passed checks, 0 failed checks)

- **Throughput:**
  - Requests per second: 50.54 req/s
  - Total requests completed: 6,122

- **Virtual Users (VU):**
  - Peak VUs: 99
  - VU ramp down: 0 after test completion

- **Data Transfer:**
  - Data Received: 182 MB
  - Data Sent: 2.5 MB

The test was successfully completed with an average iteration duration of 1.01 seconds and a maximum iteration duration of 1.15 seconds.

- Test type: Load
- Endpoint: post
- Group: books
- Command: docker run --rm -v C:/Users/Albiana/Desktop/k6-test/build:/app -i grafana/k6 run /app/load-test.js --env GROUP=books --env ENDPOINT=post

<b>Results:</b>

<img width="465" alt="image" src="https://github.com/user-attachments/assets/4ff339fc-7e73-4f03-a1b2-c40aff01c4df">

- **HTTP Request Duration:**

  - Average: 19.38 ms
  - p(90): 18.86 ms
  - p(95): 23.34 ms
  - Max: 75.34 ms

- **Failure Rate:**

  - 0.00% requests failed (0 out of 6,122 total requests)

- **Checks:**

  - 100.00% success rate (18,366 passed checks, 0 failed checks)

  - **Throughput:**

  - Requests per second: 50.54 req/s
  - Total requests completed: 6,122

- **Virtual Users (VU):**

  - Peak VUs: 99
  - VU ramp down: 0 after test completion

- **Data Transfer:**

  - Data Received: 182 MB
  - Data Sent: 2.5 MB
 
- Test type: Performance
- Endpoint: post
- Group: auth
- Command: docker run --rm -v C:/Users/Albiana/Desktop/k6-test/build:/app -i grafana/k6 run /app/performance-test.js --env GROUP=auth --env ENDPOINT=login

<img width="753" alt="image" src="https://github.com/user-attachments/assets/dff6bf91-bf32-47b9-b34c-1f6138803e02">


