const { pool } = require('../db/postgres');

module.exports = {
  getAll: async () => {
    const queryStr =
    `SELECT
      json_build_object(
        'product_id', questions.product_id,
        'results', json_build_array(
          SELECT json_build_object(
            'question_id', questions.id,
            'question_body', questions.body,
            'asker_name', questions.asker_name,
            'question_helpfulness', questions.helpful,
            'reported', questions.reported,
            'answers', json_build_object(
              answers.id, json_build_object(
                'id', answers.id,
                'body', answers.body,
                'date', answers.date_written,
                'answerer_name', answers.answerer_name,
                'helpfulness', answers.helpful,
                'photos', json_build_array(
                  answers_photos
                )
              )
            )
          )
        )
      )
      FROM questions
      INNER JOIN answers ON id = question_id`;
    const fetchQuestions = await pool.query(queryStr);
    console.log(fetchQuestions);
    return fetchQuestions;
  },
  post: async (params) => {
    const queryStr = "INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES ($1, $2, $3, $4)";
    const postQuestion = await pool.query(queryStr, params);
    console.log(postQuestion);
    return postQuestion;
  }
}