var express = require('express');
var router = express.Router();
var PostList = require('../models/PostSchema');

/* GET home page. */
router.get('/', function (req, res, next) {
    PostList.find({}, (error, results) => {
        if (error) {
            res.send(error)
        } else {
            context = {
                title: 'Post Database',
                allPosts: results,
            }
        }
        res.render('index', context);
    });
});

router.get('/newPost', (req, res) => res.render('createPost'));

router.get('/savePost', (req, res) => {
    PostList.create({
        userId: req.query.UserId,
        id: req.query.Id,
        title: req.query.Title,
        body: req.query.Body,
    }, (error) => {
        if (error) {
            res.send(error)
        } else {
            res.redirect('/')
        }
    })
});

router.get('/update', (req, res) => res.render('updatePost'));

router.get('/saveUpdate', (req, res) => {
    PostList.findOneAndUpdate({id: req.query.Id}, {title: req.query.Title, body: req.query.Body}, (error) => {
        if (error) res.send(error);
        else res.redirect('/');
    })
});

router.get('/delete', (req, res) => res.render('deletePost'));

router.get('/saveDelete', (req,res)=>{
    PostList.deleteOne({id:req.query.id},
        (error)=>{
            if(error) res.send(error);
            else res.redirect("/");
        })
});


module.exports = router;
