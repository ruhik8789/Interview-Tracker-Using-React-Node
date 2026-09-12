const interviewService = require('../services/interviewService');

const getAllInterviews = async (req, res, next) => {
    try {
        const interviews = await interviewService.getAllInterviews();

        res.json(interviews);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllInterviews,
};

// Controller deals with 
// req, res, HTTP status, HTTP response

// Service deals with business logic

// Repository deals with database and SQL

