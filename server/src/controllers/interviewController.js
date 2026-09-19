const interviewService = require('../services/interviewService');
const interviewValidator = require('../validators/interviewValidator');
const { ALLOWED_SORT_FIELDS, ALLOWED_SORT_ORDERS} = require("../validators/interviewValidator");

const getAllInterviews = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status;
        const search = req.query.search?.trim();
        const sortBy = req.query.sortBy || "created_at";
        const order = req.query.order || "desc";
        const offset = (page - 1) * limit;

        if(!ALLOWED_SORT_FIELDS[sortBy]) {
            return res.status(400).json({
                message: "Invalid sort field",
            });
        }

        if(!ALLOWED_SORT_ORDERS.includes(order)) {
            return res.status(400).json({
                message: "Invalid sort order",
            })
        }

        const [interviews, total] = await Promise.all([
            interviewService.getAllInterviews({ limit, offset, status, search, sortBy, order }),
            interviewService.getInterviewCount({ status, search })
        ]);
        const totalPages = Math.ceil(total / limit);

        res.json({
            data: interviews,
            pagination: {
                page,
                limit,
                total,
                totalPages
            },
        });
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

const createInterview = async (req, res, next) => {
    try {
        const { company, role, status } = req.body;

        const validationError = interviewValidator.validateInterview({ company, role, status });

        if(validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const newInterview = await interviewService.createInterview({ company:company.trim(), role: role.trim(), status: status.trim() });

        res.status(201).json(newInterview);
    } catch (error) {
        next(error);
    }
}

const updateInterview = async (req, res, next) => {
    try {
        const interviewId = Number(req.params.id);

        if(!Number.isInteger(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview ID."
            });
        }

        const { company, role, status } = req.body;

        const validationError = interviewValidator.validateInterview({ company, role, status });

        if(validationError) {
            return res.status(400).json({
                message: validationError
            });
        }

        const updatedInterview = await interviewService.updateInterview(interviewId, { company: company.trim(), role: role.trim(), status: status.trim() });

        if(!updatedInterview) {
            return res.status(404).json({
                message: "Interview not found."
            });
        }

        res.status(200).json(updatedInterview);
    } catch (error) {
        next(error);
    }
}

const deleteInterview = async (req, res, next) => {
    try {
        const interviewId = Number(req.params.id);

        if(!Number.isInteger(interviewId)) {
            return res.status(400).json({
                message: "Invalid interview ID."
            });
        }

        const deletedInterview = await interviewService.deleteInterview(interviewId);

        if(!deletedInterview) {
            return res.status(404).json({
                message: "Interview not found."
            });
        }

        res.status(200).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllInterviews,
    getInterviewById,
    createInterview,
    updateInterview,
    deleteInterview
};

// Controller deals with 
// req, res, HTTP status, HTTP response

// Service deals with business logic

// Repository deals with database and SQL

