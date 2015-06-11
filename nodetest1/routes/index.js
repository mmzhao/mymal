var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/mymal', function(req, res) {
	var db = req.db;
	var animes = db.get('animelist');
	animes.find({}, {
		"sort" : [["score", "desc"]]
	}, function(err, docs) {
		res.render('mymal', {
			"mymal" : docs
		});
	});
});

router.get('/newanime', function(req, res) {
	res.render('newanime', {title: "Add new anime"});
});

router.post('/addanime', function(req, res) {
	var db = req.db;
	var title = req.body.title;
	var score = parseFloat(req.body.score);
	var animes = db.get('animelist');
	animes.insert({
		"title" : title,
		"score" : score
	}, function(err, doc) {
		if(err) {
			res.send("problems yo");
		}
		else {
			res.redirect("mymal");
		}
	});
});

router.delete('deleteanime', function(req, res) {
	var db = req.db;
	var title = req.body.title;
	var animes = db.get('animelist');
	animes.delete({
		"title" : 
	})
});

module.exports = router;







