// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Enable CORS for all origins (if needed)
// app.use(cors());

// // Serve static files from React's build folder
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Example API route
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from Node.js API!' });
// });

// // Catch-all route to serve React's frontend
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// Enable CORS for all origins (if you want to allow cross-origin requests)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, 'my-app/build')));

// Catch-all route to serve React's frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-app/build', 'index.html'));
});

app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to read data.json file' });
      }
  
      try {
        const jsonData = JSON.parse(data); // Parse JSON data from file
        res.json(jsonData); // Send JSON response to the client
      } catch (parseError) {
        res.status(500).json({ error: 'Failed to parse JSON data' });
      }
    });
  });



// Route to handle updating data
app.post('/api/update', (req, res) => {
    const updatedData = req.body;
    const filePath = path.join(__dirname, 'data.json');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Failed to read file' });
      }
  
      let jsonData = JSON.parse(data);
      // Assuming the structure of your data is an array of objects
      jsonData.push(updatedData);  // Add new data to the existing data array
  
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          return res.status(500).json({ error: 'Failed to update file' });
        }
  
        res.status(200).json({ message: 'Data updated successfully', data: jsonData });
      });
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
