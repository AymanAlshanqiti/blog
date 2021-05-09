const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	const articles = [
		{
			title: 'title 1',
			description: 'description of title 1',
			markdown: 'description of title `1`',
			createdAt: new Date(),
		},
		{
			title: 'title 2',
			description: 'description of title 2',
			markdown: 'description of title `2`',
			createdAt: new Date(),
		},
		{
			title: 'title 3',
			description: 'description of title 3',
			markdown: 'description of title `3`',
			createdAt: new Date(),
		},
	];
	res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.listen(5000);
