const express = require('express');
const router = express.Router();

const { getQuestions, postQuestion } = require('./controllers/questions');
// GET /qa/questions
// POST /qa/questions
// PUT /qa/questions/:question_id/helpful

const { getAnswers, postAnswer } = require('./controllers/answers');
// GET /qa/questions/:question_id/answers
// POST /qa/questions/:question_id/answers
// PUT /qa/answers/:answer_id/helpful
// PUT /qa/answers/:answer_id/report

router.get('/questions', getQuestions);
router.post('/questions', postQuestion);
//router.put('/questions/:questionId/helpful', markQuestion);

router.get('/answers', getAnswers);
router.post('/answers', postAnswer);

module.exports = router;