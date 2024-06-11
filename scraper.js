const axios = require('axios');
const cheerio = require('cheerio');

async function fetchTheVergeTitles() {
    const url = 'https://www.theverge.com/';
    const startDate = new Date('2022-01-01');
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        console.log('HTML fetched successfully');

        let articles = [];
        $('h2.font-polysans').each((i, elem) => {
            let title = $(elem).text().trim();
            let link = $(elem).find('a').attr('href');
            let dateText = $(elem).closest('article').find('time').attr('datetime');
            let date = dateText ? new Date(dateText) : new Date();

            if (date >= startDate) {
                console.log(`Article found: Title - ${title}, Link - ${link}, Date - ${date.toISOString().split('T')[0]}`);
                articles.push({ title, link, date: date.toISOString().split('T')[0] });
            }
        });

        console.log('Total articles fetched:', articles.length);
        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

module.exports = fetchTheVergeTitles;
