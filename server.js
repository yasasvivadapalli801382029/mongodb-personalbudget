const express = require('express');
const app = express();
const port = 3100;
const fs = require("fs");

app.use('/', express.static('public'));


app.get('/hello', (req, res) => {
    res.send('Hello world');
});

app.get('/budget', (req, res) => {
    fs.readFile("budgetdata.json", "utf8", (err, data) => {
        if (err) {
          res.status(500).send("Error loading budget data");
          return;
        }
        const budgetData = JSON.parse(data);
        res.json(budgetData);
      });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})