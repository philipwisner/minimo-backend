const express = require('express');
const router = express.Router();
const Post = require('../models/post').Post;
const response = require('../helpers/response');

//LIST ALL THE POSTS
router.get('/', (req, res, next) => {
  let filters = {};
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


//ONE POST
router.get('/:id', (req, res, next) => {
  if (!req.params.id.match(/^[a-zA-Z0-9]{24}$/)) {
    return response.notFound(req, res);
  }
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }
    if (!post) {
      return response.notFound(req, res);
    }
    let data = post.asData();
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
  console.log(req.body);
  console.log('hi bitch!');
  const newPost = new Post({
    userId: req.user._id,
    // blogId: this.Blog._id,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    // postDate: this.postDate,
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
