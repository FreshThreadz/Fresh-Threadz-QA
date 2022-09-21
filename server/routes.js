"use strict";
const express = require('express');
const router = express.Router();
const { getQuestions, postQuestion, markQuestion, reportQuestion } = require('./controllers/questions');
const { getAnswers, postAnswer, markAnswer, reportAnswer } = require('./controllers/answers');
//QUESTIONS ENDPOINT
router.get('/questions', getQuestions);
router.post('/questions', postQuestion);
router.put('/questions/:questionId/helpful', markQuestion);
router.put('/questions/:questionId/report', reportQuestion);
//ANSWERS ENDPOINT
router.get('/questions/:questionId/answers', getAnswers);
router.post('/questions/:questionId/answers', postAnswer);
router.put('/answers/:answerId/helpful', markAnswer);
router.put('/answers/:answerId/report', reportAnswer);
module.exports = router;
