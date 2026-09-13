const interviewService = require('../services/interviewService');

const getAllInterviews = async (req, res, next) => {
    try {
        const interviews = await interviewService.getAllInterviews();

        res.json(interviews);
    } catch (error) {
        next(error);
    }
};

const getInterviewById = async (req, res, next) => {
    try {
        const interviewId = Number(req.params.id);

        if(!Number.isInteger(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview ID."
            });
        }

        const interview = await interviewService.getInterviewById(interviewId);

        if(!interview) {
            return res.status(404).json({
                message: "Interview not found."
            });
        }

        res.status(200).json(interview);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllInterviews,
    getInterviewById,
};

// Controller deals with 
// req, res, HTTP status, HTTP response

// Service deals with business logic

// Repository deals with database and SQL

