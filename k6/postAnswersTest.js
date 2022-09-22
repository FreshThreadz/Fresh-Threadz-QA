import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [{ duration: '1m', target: 100 }]
};

//question_id, body, date_written, answerer_name, answerer_email, helpfulness

const post = {
  body: 'I got the answers sway',
  answerer_name: 'post_tester',
  answer_email: 'post_tester@yahoo.com',
  helpfulnesss: 0,
  photos: [{url: 'testingA'}, {url: 'testingB'}],
};

const serviceEndpoint = 'http://localhost:3000/qa/questions/230758/answers';

export default () => {
  http.batch([
    ['POST', serviceEndpoint, post],
  ]);

  sleep(1);
};