const mongoose = require('mongoose');

const reditArticle = new mongoose.Schema({

    title: { type: String }

});

const article = mongoose.model("article", reditArticle);

module.exports = article;