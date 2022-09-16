"use strict";
// GET /qa/questions/:question_id/answers
// POST /qa/questions/:question_id/answers
// PUT /qa/answers/:answer_id/helpful
//PUT /qa/answers/:answer_id/report
module.exports = {
    getAnswers: async (req, res) => {
        try {
            console.log('whattup');
        }
        catch (err) {
            console.log(err);
        }
    },
    postAnswer: async (req, res) => {
        try {
            console.log(req.body);
        }
        catch (err) {
            console.error(err);
        }
    }
};
