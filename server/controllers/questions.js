"use strict";
module.exports = {
    getQuestions: async (req, res) => {
        try {
            console.log('hey');
        }
        catch (err) {
            console.log(err);
        }
    },
    postQuestion: async (req, res) => {
        try {
            console.log(req.body);
        }
        catch (err) {
            console.error(err);
        }
    }
};
