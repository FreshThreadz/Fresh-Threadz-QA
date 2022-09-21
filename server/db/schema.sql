DROP DATABASE IF EXISTS questionsanswers;
CREATE DATABASE questionsanswers;
\c questionsanswers;

CREATE TABLE questions (
  question_id bigserial PRIMARY KEY,
  product_id BIGINT,
  question_body TEXT,
  question_date BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported BOOLEAN DEFAULT FALSE,
  question_helpfulness INT
);

CREATE TABLE answers (
  id bigserial PRIMARY KEY,
  question_id BIGINT REFERENCES questions (question_id),
  body TEXT,
  date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN DEFAULT FALSE,
  helpfulness INT
);

CREATE TABLE answers_photos (
  id bigserial PRIMARY KEY,
  answer_id BIGINT REFERENCES answers (id),
  url TEXT
);

COPY questions FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-questions.csv' DELIMITER ',' CSV HEADER;

COPY answers FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-answers_photos.csv' DELIMITER ',' CSV HEADER;

SELECT setval('questions_questions_id_seq', (SELECT MAX(questions_id) FROM questions) + 1);

SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers) + 1);

SELECT setval('answers_photos_id_seq', (SELECT MAX(id) FROM answers_photos) + 1);

ALTER TABLE questions ALTER COLUMN question_date TYPE TIMESTAMP USING to_timestamp(question_date/1000);

ALTER TABLE answers ALTER COLUMN date_written TYPE TIMESTAMP USING to_timestamp(date_written/1000);

CREATE INDEX questions_product ON questions (product_id);

CREATE INDEX answers_question ON answers (question_id);

CREATE INDEX answers_answers_photos ON answers_photos (answer_id);