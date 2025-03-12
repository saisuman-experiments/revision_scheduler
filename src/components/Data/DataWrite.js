const fs = require('fs');

// New data to update
const newData = {
  name: 'Jane Doe',
  age: 32,
  city: 'Los Angeles'
};

// Read the existing JSON file
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading file:', err);
    return;
  }

  // Parse the existing data
  const parsedData = JSON.parse(data);

  // Update the data
  parsedData.name = newData.name;
  parsedData.age = newData.age;
  parsedData.city = newData.city;

  // Convert the updated data back to JSON
  const updatedData = JSON.stringify(parsedData, null, 2);

  // Write the updated data back to the JSON file
  fs.writeFile('data.json', updatedData, (err) => {
    if (err) {
      console.log('Error writing file:', err);
    } else {
      console.log('Data updated successfully');
    }
  });
});
