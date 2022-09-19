"use strict";
const { pool } = require('../db/postgres');
module.exports = {
    getAll: async (questionIdParams, page, count) => {
        const queryStr = `SELECT
    json_build_object(
      'question', ${questionIdParams},
      'page', ${page},
      'count', ${count},
      'results', (SELECT json_agg(
        json_build_object(
          'answer_id', id,
          'body', body,
          'date', date_written,
          'answerer_name', answerer_name,
          'helpfulness', helpfulness,
          'photos', (SELECT COALESCE(json_agg(answers_photos.url), '[]'::json) FROM answers_photos WHERE answer_id = answers.id)
        )
      ) FROM answers WHERE question_id = ${questionIdParams})
    )`;
        const fetchAnswers = await pool.query(queryStr);
        return fetchAnswers;
    },
    post: async (params) => {
        const queryStr = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, helpfulness)
    VALUES ($1, $2, to_timestamp(${Date.now() / 1000}), $3, $4, $5) RETURNING id`;
        const postAnswer = await pool.query(queryStr, params);
        return postAnswer;
    },
    postPhotos: async (photosArrParams) => {
        const queryStr = ``;
    }
};
