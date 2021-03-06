const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
mongoose.connect('mongodb://localhost/blog', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
	const articles = await Article.find().sort({ createdAt: 'desc' });
	res.render('articles/index', { articles });
});

app.use('/articles', articleRouter);

app.listen(5000);
