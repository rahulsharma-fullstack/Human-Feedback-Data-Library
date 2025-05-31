const { Pool } = require('pg');
const readline = require('readline');

const pool = new Pool({
    user: 'feedback',
    host: 'localhost',
    database: 'feedback',
    password: 'letmein888',
    port: 5432,
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Connected to feedback database!');
console.log('Type SQL queries (or "exit" to quit):\n');

function prompt() {
    rl.question('SQL> ', async (query) => {
        if (query.toLowerCase() === 'exit') {
            pool.end();
            rl.close();
            return;
        }

        try {
            const result = await pool.query(query);
            console.table(result.rows);
        } catch (err) {
            console.error('Error:', err.message);
        }
        prompt();
    });
}

prompt();