"use strict";
const qModels = require('../models/questions');
module.exports = {
    getQuestions: async (req, res) => {
        // console.log('req.query in get q controller....', req.query);
        // console.log('req.params in get q controller....', req.params);
        const productId = req.query.product_id;
        const fetchQuestions = await qModels.getAll(productId);
        res.status(200).send(fetchQuestions.rows[0].json_build_object);
    },
    postQuestion: async (req, res) => {
        const params = [req.body.product_id, req.body.question_body, req.body.asker_name, req.body.asker_email, 0];
        // console.log('params in post q controller....', params);
        await qModels.post(params);
        res.status(201).send('Post created successfully!');
    },
    markQuestion: async (req, res) => {
        // console.log('req.params in put q controller....', req.params);
        const questionIdParams = req.params.questionId;
        await qModels.putHelpful(questionIdParams);
        res.status(204);
    },
    reportQuestion: async (req, res) => {
        // console.log('req.params in put q controller....', req.params);
        const questionIdParams = req.params.questionId;
        await qModels.putReport(questionIdParams);
        res.status(204);
    }
};
