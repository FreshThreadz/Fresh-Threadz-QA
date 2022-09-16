DROP DATABASE IF EXISTS questionsanswers;
CREATE DATABASE questionsanswers;
\c questionsanswers;

CREATE TABLE questions (
  id bigserial PRIMARY KEY,
  product_id BIGINT,
  body TEXT,
  date_written BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT
);

CREATE TABLE answers (
  id bigserial PRIMARY KEY,
  question_id BIGINT REFERENCES questions (id),
  body TEXT,
  date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT
);

CREATE TABLE answers_photos (
  id bigserial PRIMARY KEY,
  answer_id BIGINT REFERENCES answers (id),
  url TEXT
);

COPY questions FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-questions.csv' DELIMITER ',' CSV HEADER;

COPY answers FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-answers.csv' DELIMITER ',' CSV HEADER;

COPY answers_photos FROM '/Users/GODBODYLALLANA/Desktop/hackreactor/rfp2207-system-design-capstone/sdc-superman-service-qa/server/db/sdc-superman-answers_photos.csv' DELIMITER ',' CSV HEADER;