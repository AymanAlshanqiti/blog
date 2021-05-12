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
		res.redirect(`/articles/${article.slug}`);
	} catch (error) {
		res.render('articles/new', { article });
	}
});

router.get('/edit/:id', async (req, res) => {
	const article = await Article.findById(req.params.id);
	res.render('articles/edit', { article });
});

router.put('/:id', async (req, res) => {
	const article = await Article.findById(req.params.id);
	article.title = req.body.title;
	article.description = req.body.description;
	article.markdown = req.body.markdown;
	try {
		await article.save();
		res.redirect(`/articles/${article.slug}`);
	} catch (error) {
		res.redirect('/articles/edit', { article });
	}
});

router.delete('/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('/');
});

router.get('/:slug', async (req, res) => {
	const article = await Article.findOne({ slug: req.params.slug }, { __v: 0 });
	if (article === null) res.redirect('/');
	res.render('articles/show', { article });
});

module.exports = router;
