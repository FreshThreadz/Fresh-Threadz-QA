const express = require('express');
const router = express.Router();

const { getQuestions, postQuestion, markQuestion, reportQuestion } = require('./controllers/questions');

const { getAnswers, postAnswer } = require('./controllers/answers');
// GET /qa/questions/:question_id/answers
// POST /qa/questions/:question_id/answers
// PUT /qa/answers/:answer_id/helpful
// PUT /qa/answers/:answer_id/report

//QUESTIONS ENDPOINT
router.get('/questions', getQuestions);
router.post('/questions', postQuestion);
router.put('/questions/:questionId/helpful', markQuestion);
router.put('/questions/:questionId/report', reportQuestion);
//ANSWERS ENDPOINT
router.get('/questions/:questionId/answers', getAnswers);
router.post('/questions/:questionId/answers', postAnswer);
// router.put('/qa/answers/:answerId/helpful', markAnswer);
// router.put('/qa/answers/:answerId/report', reportAnswer);

module.exports = router;