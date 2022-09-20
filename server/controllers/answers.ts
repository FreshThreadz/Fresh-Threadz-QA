const aModels = require('../models/answers');

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
    // console.log('photosArr....', photosArrParams);
    // console.log('postAnswer answerId...', answerId);

    photosArrParams.forEach((url) => {
      aModels.postPhotos(answerId, `'${url}'`);
    });
    // const postPhotos = await aModels.postPhotos(photosArrParams);
    res.status(201).send('Post created successfully!');
  },
  markAnswer: async (req, res) => {
    // console.log('req.query in put a controller....', req.query);
    // console.log('req.params in put a controller....', req.params);
    const answerId = req.params.answerId;

    await aModels.putHelpful(answerId);
    console.log('Marked answer as helpful.');
    res.status(204);
  },
  reportAnswer: async (req, res) => {
    // console.log('req.query in put a controller....', req.query);
    // console.log('req.params in put a controller....', req.params);
    const answerId = req.params.answerId;

    await aModels.putReport(answerId);
    console.log('Reported answer.');
    res.status(204);
  }
}