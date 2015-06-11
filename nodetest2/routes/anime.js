var express = require('express');
var router = express.Router();

/*
 * GET animelist.
 */
router.get('/animelist', function(req, res) {
  var db = req.db;
  var animes = db.get('animelist');
  animes.find({}, {
  	"sort" : [["score", -1]]
  }, function(err, docs){
  	res.json(docs);
  });
});

/*
 * POST to addanime.
 */
router.post('/addanime', function(req, res) {
	var db = req.db;
	var title = req.body.title;
	var score = parseFloat(req.body.score);
	var rating = req.body.rating;
	var rank = req.body.rank;
	var animes = db.get('animelist');
	animes.insert({
		'title' : title,
		'score' : score,
		'rating' : rating,
		'rank' : rank
	}, function(err, result) {
		res.send((err === null) ? {msg : ''} : {msg : 'error: ' + err});
	});
});

/*
 * DELETE to deleteanime
 */
router.delete('/deleteanime/:id', function(req, res) {
	var db = req.db;
	var animes = db.get('animelist');
	animes.remove({
		'_id' : req.params.id
	}, function(err) {
		res.send((err === null) ? {msg : ''} : {msg : 'error: ' + err});
	});
});

/*
 * POST to editeanime
 */
router.post('/editanime', function(req, res) {
	var db = req.db;
	var oldTitle = req.body.oldTitle;
	var title = req.body.title;
	var score = parseFloat(req.body.score);
	var rating = req.body.rating;
	var rank = req.body.rank;
	var animes = db.get("animelist");
	animes.update({
		'title' : oldTitle
	}, {$set: {
		'title' : title,
		'score' : score,
		'rating' : rating,
		'rank' : rank
	}}, function(err, result) {
		res.send((err === null) ? {msg : ''} : {msg : 'error: ' + err});
	});
});

module.exports = router;








