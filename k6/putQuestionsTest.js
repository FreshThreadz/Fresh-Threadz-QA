import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '1m', target: 100 }],
};

const serviceEndpoint = 'http://localhost:3000/qa';

export default () => {
  http.batch([
    ['PUT', `${serviceEndpoint}/questions/1/helpful`],
    ['PUT', `${serviceEndpoint}/questions/250000/helpful`],
    ['PUT', `${serviceEndpoint}/questions/6879317/helpful`]
  ]);

  sleep(1);
};