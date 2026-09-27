const express = require('express');
const path = require('path');

// ========================================
// TODO: Task 1 - Create Express App
// ========================================

const app = express();

const PORT = process.env.PORT || 3000;


// ========================================
// TODO: Task 2 - Serve Static Files
// ========================================
// Configure Express to serve static files from the 'public' directory

app.use(express.static('public'));


// ========================================
// TODO: Task 3 - Add Route Handlers
// ========================================
// Create route handlers for the main pages

// Home page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// About page route
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Contact page route
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});


// ========================================
// TODO: Task 4 - Create API Endpoint
// ========================================
// Create a JSON API endpoint that returns current date/time

app.get('/api/time', (req, res) => {
    const now = new Date();

    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});


// ========================================
// TODO: Task 5 - Error Handling Middleware
// ========================================

// 404 handler - must be after all routes
app.use((req, res) => {
    res.status(404).sendFile(
        path.join(__dirname, 'public', '404.html')
    );
});

// 500 error handler - must be last
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);

    res.status(500).sendFile(
        path.join(__dirname, 'public', '500.html')
    );
});


// ========================================
// Start the Server
// ========================================

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('\nAvailable routes:');
    console.log('GET /         -> Home page');
    console.log('GET /about    -> About page');
    console.log('GET /contact  -> Contact page');
    console.log('GET /api/time -> Current date/time API');
    console.log('\nPress Ctrl+C to stop the server');
});