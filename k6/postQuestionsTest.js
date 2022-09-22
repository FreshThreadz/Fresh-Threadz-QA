import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '1m', target: 100 }]
};

const post = {
  product_id: 65635,
  question_body: 'What are thoooooooose',
  asker_name: 'post_tester',
  asker_email: 'post_tester@yahoo.com',
  question_helpfulness: 0,
};

const serviceEndpoint = 'http://localhost:3000/qa/questions';

export default () => {
  http.batch([
    ['POST', serviceEndpoint, post],
  ]);

  sleep(1);
};