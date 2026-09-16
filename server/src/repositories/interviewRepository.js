const pool = require("../config/database");

const getInterviewCount = async () => {
    const result = await pool.query(
        `SELECT COUNT(*) FROM interviews`
    );

    return Number(result.rows[0].count);
}

const getAllInterviews = async ({ limit, offset }) => {
    const result = await pool.query(
        `SELECT * FROM interviews 
        ORDER BY created_at DESC
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );
    
    return result.rows;
};

const getInterviewById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM interviews WHERE id = $1`, [id]
    );

    return result.rows[0];
}

const createInterview = async ({ company, role, status }) => {
    const result = await pool.query(
        `INSERT INTO interviews (company, role, status) 
        VALUES ($1, $2, $3) 
        RETURNING *
        `, 
        [company, role, status]
    );

    return result.rows[0];
}

const updateInterview = async (id, { company, role, status }) => {
    const result = await pool.query(
        `UPDATE interviews 
        SET 
        company = $1,
        role = $2,
        status = $3,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *
        `,
        [company, role, status, id]
    );

    return result.rows[0];
}

const deleteInterview = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM interviews 
        WHERE id = $1 
        RETURNING id
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllInterviews,
    getInterviewById,
    createInterview,
    updateInterview,
    deleteInterview,
    getInterviewCount
};