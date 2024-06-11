const express = require('express');
const fetchTheVergeTitles = require('./scraper');
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const articles = await fetchTheVergeTitles();
    res.render('index', { articles });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
