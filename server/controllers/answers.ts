module.exports = {
  getAnswers: async (req, res) => {
    try {
      console.log('whattup');
    } catch(err) {
      console.log(err);
    }
  },
  postAnswer: async (req, res) => {
    try {
      console.log(req.body);
    } catch(err) {
      console.error(err);
    }
  }
}