const pool = require("../config/database");

const getAllInterviews = async () => {
    const result = await pool.query(
        `SELECT * FROM interviews ORDER BY created_at DESC`
    );
    
    return result.rows;
};

module.exports = {
    getAllInterviews,
};