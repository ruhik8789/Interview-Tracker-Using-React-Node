const express = require('express');

const router = express.Router();

const interviewController = require('../controllers/interviewController');

router.get("/", interviewController.getAllInterviews);

router.get("/:id", interviewController.getInterviewById);

module.exports = router;