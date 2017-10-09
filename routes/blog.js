const express = require('express');
const router = express.Router();
const Blog = require('../models/blog').Blog;
const response = require('../helpers/response');


// LIST ALL THE BLOGS
router.get('/', (req, res, next) => {
  console.log(req.user)
  let filters = {userId: req.user._id};
  Blog(filters, (err, posts) => {
    if (err) {
      return next(res);
    }
    let data = blogs.map((post) => {
      return blog.asData();
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


//CREATE A BLOG
router.post('/', (req, res, next) => {
  const newBlog = new Blog({
    userId: req.user._id,
    blogName: req.body.blogName,
    blogDescription: req.body.blogDescription,
    blogImage: req.body.blogImage,
    blogDate: new Date(),
  });

  newBlog.save( (err) => {
    if (err) {
      return response.unexpectedError(err);
    }
    if (newBlog.errors) {
      return response.notFound(req, res);
    }
    let data = newBlog.asData();
    return response.data(req, res, data);
  });
});




module.exports = router;
