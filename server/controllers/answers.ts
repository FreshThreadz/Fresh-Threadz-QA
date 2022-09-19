const aModels = require('../models/answers');

// POST /qa/questions/:question_id/answers
// PUT /qa/answers/:answer_id/helpful
//PUT /qa/answers/:answer_id/report
module.exports = {
  getAnswers: async (req, res) => {
    // console.log('req.query in get a controller....', req.query);
    // console.log('req.params in get a controller....', req.params);
    const questionIdParams = req.params.questionId;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    // console.log('page...', page);
    // console.log('count...', count);
    const fetchAnswers = await aModels.getAll(questionIdParams, page, count);
    res.status(200).send(fetchAnswers.rows[0].json_build_object);
  },
  postAnswer: async (req, res) => {
    // console.log('req.query in post a controller....', req.query);
    // console.log('req.params in post a controller....', req.params);
    // const questionIdParams = req.params.questionId;
    const photosArrParams = req.body.photos;
    const params = [req.params.questionId, req.body.body, req.body.answerer_name, req.body.answerer_email, 0];

    const postAnswer = await aModels.post(params);
    const answerId = postAnswer.rows[0].id;
    console.log('postAnswer id...', answerId);
    // const postPhotos = await aModels.postPhotos(photosArrParams);
    res.status(201).send('Post created successfully!');
  }
}