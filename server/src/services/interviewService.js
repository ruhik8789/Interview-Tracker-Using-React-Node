const interviewRepository = require('../repositories/interviewRepository');

const getAllInterviews = async ({ limit, offset }) => {
    return await interviewRepository.getAllInterviews({ limit, offset });
};

const getInterviewById = async (id) => {
    return await interviewRepository.getInterviewById(id);
}

const createInterview = async ({ company, role, status }) => {
    return await interviewRepository.createInterview({ company, role, status });
}

const updateInterview = async (id, { company, role, status }) => {
    return await interviewRepository.updateInterview(id, { company, role, status });
}

const deleteInterview = async (id) => {
    return await interviewRepository.deleteInterview(id);
};

module.exports = {
    getAllInterviews,
    getInterviewById,
    createInterview,
    updateInterview,
    deleteInterview
};