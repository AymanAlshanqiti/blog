const express = require('express');
const router = express.Router();
const Article = require('./../models/article');

router.get('/new', (req, res) => {
	const article = new Article();
	res.render('articles/new', { article });
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown,
	});
	try {
		await article.save();
		res.redirect('/');
	} catch (error) {
		res.render('articles/new', { article });
	}
});

router.get('/:id', async (req, res) => {
	const article = await Article.findById(req.params.id, { __v: 0 });
	res.render('articles/show', { article });
});

module.exports = router;
