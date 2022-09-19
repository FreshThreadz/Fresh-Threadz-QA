"use strict";
const { pool } = require('../db/postgres');
module.exports = {
    getAll: async (productId) => {
        const queryStr = `SELECT
    json_build_object(
      'product_id', ${productId},
      'results', (SELECT json_agg(
        json_build_object(
          'question_id', question_id,
          'question_body', question_body,
          'question_date', question_date,
          'asker_name', asker_name,
          'question_helpfulness', question_helpfulness,
          'reported', reported,
          'answers', (SELECT json_object_agg(
            id, json_build_object(
              'id', id,
              'body', body,
              'date', date_written,
              'answerer_name', answerer_name,
              'helpfulness', helpfulness,
              'photos', (SELECT COALESCE(json_agg(answers_photos.url), '[]'::json) FROM answers_photos WHERE answer_id = answers.id)
            )
          ) FROM answers WHERE question_id = questions.question_id)
        )
      ) FROM questions WHERE product_id = ${productId} AND reported = false)
    )`;
        const fetchQuestions = await pool.query(queryStr);
        return fetchQuestions;
    },
    post: async (params) => {
        const queryStr = `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, question_helpfulness)
    VALUES ($1, $2, to_timestamp(${Date.now() / 1000}), $3, $4, $5)`;
        const postQuestion = await pool.query(queryStr, params);
        return postQuestion;
    },
    putHelpful: async (questionIdParams) => {
        const queryStr = `UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = ${questionIdParams}`;
        const markQuestion = await pool.query(queryStr);
        return markQuestion;
    },
    putReport: async (questionIdParams) => {
        const queryStr = `UPDATE questions
    SET reported = true
    WHERE question_id = ${questionIdParams}`;
        const reportQuestion = await pool.query(queryStr);
        return reportQuestion;
    }
};
