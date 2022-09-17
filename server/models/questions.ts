const { pool } = require('../db/postgres');

module.exports = {
  getAll: async () => {
    const queryStr =
    `SELECT id, product_id, body, date_written, asker_name, asker_email, reported, helpful, (SELECT id, body, date_written, answerer_name, helpful FROM answers a WHERE a.id = q.id) answers FROM questions q`;
    const fetchQuestions = await pool.query(queryStr);
    // console.log(fetchQuestions);
    return fetchQuestions;
  },
  post: async (params) => {
    const queryStr = "INSERT INTO questions (body, asker_name, asker_email, product_id) VALUES ($1, $2, $3, $4)";
    const postQuestion = await pool.query(queryStr, params);
    // console.log(postQuestion);
    return postQuestion;
  }
}