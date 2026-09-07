const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// cors() is a middleware that allows cross-origin requests. This is useful when your frontend and backend are hosted on different ports ot domains.
app.use(cors());

// if a request body is sent in JSON format, this middleware will parse it and make it available in req.body
app.use(express.json());

const PORT = process.env.PORT || 5000;

// pool.query("SELECT * FROM interviews")
//     .then((result) => {
//         console.log("Database connected:", result.rows[0]);
//     })
//     .catch((error) => {
//         console.error("Database connection failed:", error);
//     });

// Our API should only accept these four values
const ALLOWED_STATUSES = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected"
];

// let interviews = [
//     {
//         id: 1,
//         company: "Google",
//         role: "Frontend Developer",
//         status: "Interview"
//     },
//     {
//         id: 2,
//         company: "Facebook",
//         role: "Backend Developer",
//         status: "Offer"
//     }
// ];

const validateInterview = ({ company, role, status }) => {
    if (!company?.trim()) {
        return "Company is required";
    }

    if (!role?.trim()) {
        return "Role is required";
    }

    if (!ALLOWED_STATUSES.includes(status)) {
        return "Invalid interview status";
    }

    return null;
}

app.get('/api/interviews', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM interviews");

        res.json(result.rows);
    } catch (error) {
        console.error("Failed to fetch interviews:", error);

        res.status(500).json({
            message: "Failed to fetch interviews",
            error: error.message
        });
    }
});

app.get('/api/interviews/:id', async (req, res) => {
    const interviewId = Number(req.params.id);

    try {
        const result = await pool.query("SELECT * FROM interviews WHERE id = $1", [interviewId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Failed to fetch interview:", error);

        res.status(500).json({
            message: "Failed to fetch interview",
            error: error.message
        });
    }
});

app.post('/api/interviews', async (req, res) => {
    const { company, role, status } = req.body;

    const validationError = validateInterview({
        company,
        role,
        status
    });

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    try {
        const result = await pool.query(
            `INSERT INTO interviews (company, role, status) VALUES ($1, $2, $3) RETURNING *`, 
            [company.trim(), role.trim(), status]
        );
        console.log("result", result);
        console.log("result.rows", result.rows);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to create interview:", error);

        res.status(500).json({
            message: "Failed to create interview"
        })
    }
});

app.put('/api/interviews/:id', async (req, res) => {
    const interviewId = Number(req.params.id);

    const { company, role, status } = req.body;

    const validationError = validateInterview({
        company,
        role,
        status
    });

    if (validationError) {
        return res.status(400).json({
            message: validationError
        })
    }

    try {
        const result = await pool.query(
            "UPDATE interviews SET company = $1, role = $2, status = $3 WHERE id = $4 RETURNING *",
            [company.trim(), role.trim(), status, interviewId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to update interview:", error);

        res.status(500).json({
            message: "Failed to update interview",
            error: error.message
        });
    }
});

app.delete('/api/interviews/:id', async (req, res) => {
    const interviewId = Number(req.params.id);

    try {
        const result = await pool.query(
            "DELETE FROM interviews WHERE id = $1 RETURNING id",
            [interviewId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Interview not found" });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Failed to delete interview:", error);

        res.status(500).json({
            message: "Failed to delete interview",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});