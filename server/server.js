const express = require('express');
const cors = require('cors');

const app = express();

// cors() is a middleware that allows cross-origin requests. This is useful when your frontend and backend are hosted on different ports ot domains.
app.use(cors());

// if a request body is sent in JSON format, this middleware will parse it and make it available in req.body
app.use(express.json());

const PORT = 5000;

let interviews = [
    {
        id: 1,
        company: "Google",
        role: "Frontend Developer",
        status: "Interview"
    },
    {
        id: 2,
        company: "Facebook",
        role: "Backend Developer",
        status: "Offer"
    }
];

app.get('/api/interviews', (req, res) => {
    res.json(interviews);
});

app.get('/api/interviews/:id', (req, res) => {
    const interviewId = Number(req.params.id);

    const interview = interviews.find(i => i.id === interviewId);

    if(!interview) {
        return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
});

app.post('/api/interviews', (req, res) => {
    const { company, role, status } = req.body;

    const newInterview = {
        id: interviews.length + 1,
        company,
        role,
        status
    };

    interviews.push(newInterview);

    res.status(201).json(newInterview);
});

app.put('/api/interviews/:id', (req, res) => {
    const interviewId = Number(req.params.id);

    const interview = interviews.find(i => i.id === interviewId);

    if(!interview) {
        return res.status(404).json({ message: "Interview not found" });
    }

    const { company, role, status } = req.body;

    interview.company = company;
    interview.role = role;
    interview.status = status;

    res.status(200).json(interview);
});

app.delete('/api/interviews/:id', (req, res) => {
    const interviewId = Number(req.params.id);

    const interviewIndex = interviews.findIndex(i => i.id === interviewId);

    if(interviewIndex === -1) {
        return res.status(404).json({ message: "Interview not found" });
    }

    interviews = interviews.filter(i => i.id !== interviewId);

    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});