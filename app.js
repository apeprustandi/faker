const { fakerID_ID: faker } = require('@faker-js/faker');
const express = require('express');
const app = express();
const port = 3000;

// Function to generate fake product data
const generateFakeData = (jumlah) => ({
  message: "",
  data: Array.from({ length: jumlah }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      name: `${firstName} ${lastName}`,
      username: faker.internet.userName({ firstName, lastName }).toLowerCase(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      avatar: faker.image.avatar(),
    };
  })
});

// Initialize fakeProducts
let fakeProducts = generateFakeData(10); // Default to 10 items

// Middleware to regenerate fake products on each request
app.use((req, res, next) => {
  const jumlah = parseInt(req.params.jumlah) || 10;
  fakeProducts = generateFakeData(jumlah);
  next();
});

// GET route to return all products
app.get('/api/faker/:jumlah', (req, res) => {
  const jumlah = parseInt(req.params.jumlah) || 10;
  const data = generateFakeData(jumlah);
  res.json({
    success: res.statusCode >= 200 && res.statusCode < 300,
    message: data.message,
    data: data.data
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});