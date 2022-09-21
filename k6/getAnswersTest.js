import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1000 },
    { duration: '10m', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<50']
  }
};

const serviceEndpoint = 'http://localhost:3000/qa';

export default () => {
  http.batch([
    ['GET', `${serviceEndpoint}/questions/${1}/answers?page=1&count=50`],
    ['GET', `${serviceEndpoint}/questions/${500000}/answers?page=1&count=50`],
    ['GET', `${serviceEndpoint}/questions/${6879317}/answers?page=1&count=50`],
  ]);

  sleep(1);
};