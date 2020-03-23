const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request-promise');
const articleModel = require('./models/article');


async function connect() {
    mongoose.connect('mongodb://localhost/WebScraping', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log('database connected'); })
        .catch((error) => { console.log(error.message); });
}


async function Scraping() {

    const html = await request.get("https://www.thetimes.co.uk");
    const $ = await cheerio.load(html);
    const titles = $("h2");

    titles.each(async (i, element) => {
        try {
            const title = $(element).text();
            console.log(title);
            const redditarticleModel = new articleModel({
                title: title
            });
            await redditarticleModel.save();
        }
        catch (error) { console.log(error.message); }
    });

}

async function main() {
    await connect();
    await Scraping();
}

main();