const interviewRepository = require('../repositories/interviewRepository');

const getAllInterviews = async () => {
    return await interviewRepository.getAllInterviews();
};

const getInterviewById = async (id) => {
    return await interviewRepository.getInterviewById(id);
}

module.exports = {
    getAllInterviews,
    getInterviewById,
};