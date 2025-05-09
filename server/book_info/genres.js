const pool = require("../database");


module.exports = async function getGenres(req, res) {
    try {
        const [rows] = await pool.query("SELECT DISTINCT genre FROM book");

        let genres = rows.map(row => ({
            genre: row.genre
        }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ genres: genres }));

    } catch (error) {
        console.error("Error fetching genres:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};
