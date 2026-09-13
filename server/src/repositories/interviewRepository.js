const pool = require("../config/database");

const getAllInterviews = async () => {
    const result = await pool.query(
        `SELECT * FROM interviews ORDER BY created_at DESC`
    );
    
    return result.rows;
};

const getInterviewById = async (id) => {
    const result = await pool.query(
        `SELECT * FROM interviews WHERE id = $1`, [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllInterviews,
    getInterviewById,
};