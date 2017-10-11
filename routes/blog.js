const express = require('express');
const router = express.Router();
const Blog = require('../models/blog').Blog;
const response = require('../helpers/response');


// LIST ALL THE BLOGS
router.get('/', (req, res, next) => {
  Blog.find({userId: req.user._id}).sort({blogDate : -1}).exec((err, blogs) => {
    if (err) {
      return next(res);
    }
    let data = blogs.map((blog) => {
      return blog.asData();
    });
    return response.data(req, res, data);
  });
});


//I need to filter all the posts that have this blog id!

//ONE BLOG
router.get('/:id', (req, res, next) => {
  if (!req.params.id.match(/^[a-zA-Z0-9]{24}$/)) {
    return response.notFound(req, res);
  }
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      return next(err);
    }
    if (!blog) {
      return response.notFound(req, res);
    }
    let data = blog.asData();
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
      return response.unexpectedError(req, res, err);
    }
    let data = newBlog.asData();
    return response.data(req, res, data);
  });
});




module.exports = router;
