const express = require('express');
const router = express.Router();

const { getQuestions, postQuestion } = require('./controllers/questions');
const { getAnswers, postAnswer } = require('./controllers/answers');

router.get('/questions', getQuestions);
router.post('/questions', postQuestion);

router.get('/answers', getAnswers);
router.post('/answers', postAnswer);

module.exports = router;