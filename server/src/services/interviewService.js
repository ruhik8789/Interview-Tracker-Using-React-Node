const interviewRepository = require('../repositories/interviewRepository');

const getAllInterviews = async () => {
    return await interviewRepository.getAllInterviews();
};

module.exports = {
    getAllInterviews,
};