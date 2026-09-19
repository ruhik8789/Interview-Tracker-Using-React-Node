const pool = require("../config/database");

const getInterviewCount = async ({ status, search }) => {
    let values = [];
    let conditions = [];

    if(status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
    }

    if(search) {
        values.push(`%${search}`);
        conditions.push(`
        (
        company ILIKE $${values.length}
        OR role ILIKE $${values.length}
        )
        `)
    }

    const whereClause = 
    conditions.length > 0 
    ? `WHERE ${conditions.join(" AND ")}` 
    : "";

    const query = `
    SELECT COUNT(*) FROM interviews
    ${whereClause}
    `

    const result = await query.pool(query, values);

    return Number(result.rows[0].count);
}

const getAllInterviews = async ({ limit, offset, status, search }) => {
    const values = [];
    const conditions = [];

    if(status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
    }

    if(search) {
        values.push(`%${search}%`);
        conditions.push(`
        (
        company ILIKE $${values.length}
        OR role ILIKE $${values.length}
        )
        `)
    }

    values.push(limit);
    const limitParam = `$${values.length}`;

    values.push(offset);
    const offsetParam = `$${values.length}`;

    const whereClause = 
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""; 

    const query = `
    SELECT * FROM interviews
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ${limitParam}
    OFFSET ${offsetParam}
    `;

    const result = await pool.query(query, values);
    
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