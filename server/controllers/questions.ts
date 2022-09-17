const models = require('../models/questions');

// GET /qa/questions
// POST /qa/questions
// PUT /qa/questions/:question_id/helpful
module.exports = {
  getQuestions: async (req, res) => {
    console.log('req.query in controller....', req.query);
    console.log('req.params in controller....', req.params);
    // console.log('res...', res);
    const fetchQuestions = await models.getAll();
    const questionsResponse = {
      "product_id": req.query.product_id,
      "results": fetchQuestions.rows,
    };
    res.send(questionsResponse);
    // console.log(questionsReponse);
    return res.json(fetchQuestions);
  },
  postQuestion: async (req, res) => {
    const params = [req.body.body, req.body.asker_name, req.body.asker_email, req.body.product_id];
    const sendQuestion = await models.post(params);
    return res.json(sendQuestion);
  }
}