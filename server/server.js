const express = require('express')
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool setup
const database = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 4396,
    user: process.env.DB_USER || 'cabtaxic_Epos_Master123',
    password: process.env.DB_PASS || 'ePos_deV',
    database: process.env.DB_NAME || 'epos_database'
});


// Configure Multer for file uploads


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Make sure the 'uploads/' folder exists
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Test MySQL connection
database.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
        connection.release();
    }
});

// POST route to register a company with a logo upload
app.post('/register-branch', upload.single('doc_path'), async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const { company_id, branch_name, branch_address, email_address, contact_no, webpage, branch_type, verified, status } = req.body;

    // Validate required fields
    if (!company_id || !branch_name || !branch_address || !email_address || !contact_no || !webpage || !branch_type) {
        return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const doc_path = req.file ? req.file.path : '';
    const statusValue = status === '1' ? 1 : 0; // Convert from string to numeric

    try {
        // Check if the company_id exists in the 'company' table
        const [companyResult] = await database.promise().query('SELECT * FROM company WHERE id = ?', [company_id]);
        if (companyResult.length === 0) {
            return res.status(400).json({ message: 'Invalid company ID' });
        }

        // Insert new branch into the database
        const query = `
            INSERT INTO company_branches (company_id, branch_name, branch_address, email_address, contact_no, doc_path, webpage, branch_type, verified, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            company_id,
            branch_name,
            branch_address,
            email_address,
            contact_no,
            doc_path,
            webpage,
            branch_type,
            verified || '',
            statusValue
        ];

        const [result] = await database.promise().query(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Branch registered successfully' });
        } else {
            res.status(500).json({ message: 'Failed to register branch' });
        }
    } catch (err) {
        console.error('Error processing registration request:', err);
        // Respond with a specific error message
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// get the companies

app.get('/get-companies/:company_id', async (req, res) => {
    const companyId = req.params.company_id;
    const sql = 'SELECT company_name FROM company WHERE id = ?';  // Only select the company_name
    try {
        const [results] = await database.promise().query(sql, [companyId]);
        if (results.length > 0) {
            // Return only the company_name if a result is found
            res.json({ company_name: results[0].company_name });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (err) {
        console.error('Error fetching company:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});     

// get branches
app.get('/get-branches/:company_id', async (req, res) => {
    const companyId = req.params.company_id;
    const sql = 'SELECT * FROM company_branches WHERE company_id = 1';  
    try {
        const [results] = await database.promise().query(sql, [companyId]);
        if (results.length > 0) {
            res.json(results); 
        } else {
            res.status(404).json({ message: 'No branches found for this company' });
        }
    } catch (err) {
        console.error('Error fetching branches:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add this to your existing server code (e.g., server.js or index.js)
app.put('/edit-branch/:id', (req, res) => {
    const { id } = req.params;
    const { branch_name, branch_address, email_address, contact_no, webpage } = req.body;

    const query = `
        UPDATE company_branches 
        SET branch_name = ?, branch_address = ?, email_address = ?, contact_no = ?, webpage = ?
        WHERE id = ?
    `;
    
    database.query(query, [branch_name, branch_address, email_address, contact_no, webpage, id], (err, result) => {
        if (err) {
            console.error('Error updating branch:', err);
            return res.status(500).json({ message: 'Error updating branch' });
        }
        res.json({ message: 'Branch updated successfully' });
    });
});




// GET route to fetch all registered companies
app.get('/company', async (req, res) => {
    const sql = 'SELECT * FROM company';
    try {
        const [results] = await database.promise().query(sql);
        res.json(results);
    } catch (err) {
        console.error('Error fetching companies:', err);
        res.status(500).json({ error: 'Failed to fetch companies' });
    }
});

// API endpoint to get branches by company ID
app.get('/branches', (req, res) => {
    const companyId = req.query.company_id;

    if (!companyId) {
        return res.status(400).json({ message: 'Company ID is required' });
    }

    const query = 'SELECT * FROM company_branches WHERE company_id = ?';
    database.query(query, [companyId], (err, results) => {
        if (err) {
            console.error('Error fetching branches:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);
    });
});



// POST route for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // const [rows] = await database.promise().query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        const [rows] = await database.promise().query(
            'SELECT u.*, e.first_name, e.last_name FROM users u INNER JOIN employees e ON u.emp_id = e.id WHERE u.username = ? AND u.password = ?',
            [username, password]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'No records available. Try again.' });
        }

        const user = rows[0];

        // Check plain password against stored password
        if (user.password !== password) {
            return res.status(401).json({ message: 'No records available. Try again.' });
        }

        // Successful login
        return res.status(200).json({
            message: 'Login successful',
            data: {
                username: user.username,
                userid: user.id,
                company_id: user.company_id,
                branch_id: user.branch_id,
                emp_name: `${user.first_name} ${user.last_name}`
            }
        });
    } catch (err) {
        console.error('Error processing login request:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
