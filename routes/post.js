const express = require('express');
const router = express.Router();
const Post = require('../models/post').Post;
const response = require('../helpers/response');

//LIST ALL THE POSTS
router.get('/', (req, res, next) => {
  console.log(req.user)
  let filters = {userId: req.user._id};
  Post.find(filters, (err, posts) => {
    if (err) {
      return next(res);
    }
    let data = posts.map((post) => {
      return post.asData();
    });
    return response.data(req, res, data);
  });
});


// //UPLOAD FILE
// router.post('/upload', upload.single('file'), (req, res, next) => {
//   const data = {
//     fileName: `/uploads/${req.file.filename}`
//
//   };
//   //console.log('upload: ', req.user);
//   return response.data(req, res, data);
// });


//CREATE A POST
router.post('/', (req, res, next) => {
  const newPost = new Post({
    userId: req.user._id,
    // blogId: this.Blog._id,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    postDate: new Date(),
  });

  newPost.save( (err) => {
    if (err) {
      return response.unexpectedError(err);
    }
    if (newPost.errors) {
      return response.notFound(req, res);
    }
    let data = newPost.asData();
    return response.data(req, res, data);
  });
});




module.exports = router;
