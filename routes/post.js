const express = require('express');
const router = express.Router();
const Post = require('../models/post').Post;
const response = require('../helpers/response');


//LIST ALL THE POSTS (NEWEST)
router.get('/', (req, res, next) => {
  Post.find({userId: req.user._id, blogId : {"$exists" : false}}).sort({postDate : -1}).exec((err, posts) => {
    if (err) {
      return next(res);
    }
    let data = posts.map((post) => {
      return post.asData();
    });
    return response.data(req, res, data);
  });
});


// ALL THE POSTS THAT BELONG TO REQUESTED BLOG
router.get('/blog/:id', (req, res, next) => {
  Post.find({blogId: req.params.id}).sort({postDate : -1}).exec((err, posts) => {
    if (err) {
      return next(res);
    }
    let data = posts.map((post) => {
      return post.asData();
    });
    return response.data(req, res, data);
  });
});


// frontend component -
//    posts: Object[] | null;
//    sort: string = "newest"
//    [(ngModel)]="sort" (change??????)="handleChange()"><options value="newest">...
//    private loadPosts() {
//      this.posts = null;
//      posts.findByUser(this.user.id, this.sort).subscribe.... this.posts = posts;
//    ngOnInit -> loadPosts
//    handleChange -> loadPosts
// frontend service - http.get(baseUrl + '/user/' + userID + '/posts/' + sort);

// list all the posts from a user (minus the ones with a blogID)
// /user/:id/posts/:sort
// criteria = {
//   userId: req.params.id,
//   blogId: undefined // blogId: { eq: undefined ... isUndefined }
// }
// const query = User.find(criteria)
// query.sort({postDate : req.params.sort === 'oldest' ? 1 : -1})
// query.exec( ....







//
// router.get('/oldest', (req, res, next) => {
//   console.log('oldest backend')
//   var query = Post.find({userId: req.user._id});
//   query.sort({postDate : req.params.sort === 'oldest' ? 1 : -1})
//   query.exec((err, posts) => {
//     if (err) {
//       return next(res);
//     }
//     let data = posts.map((post) => {
//       return post.asData();
//     });
//     return response.data(req, res, data);
//   });
// });




//CREATE A POST
router.post('/', (req, res, next) => {
  const newPost = new Post({
    userId: req.user._id,
    blogId: req.body.blogId || undefined,
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
    postDate: new Date(),
  });

  newPost.save( (err) => {
    if (err) {
      return response.unexpectedError(req, res, err);
    }
    let data = newPost.asData();
    return response.data(req, res, data);
  });
});

// frontend component -
//    posts: Object[] | null;
//    sort: string = "newest"
//    [(ngModel)]="sort" (change??????)="handleChange()"><options value="newest">...
//    private loadPosts() {
//      this.posts = null;
//      posts.findByUser(this.user.id, this.sort).subscribe.... this.posts = posts;
//    ngOnInit -> loadPosts
//    handleChange -> loadPosts
// frontend service - http.get(baseUrl + '/user/' + userID + '/posts/' + sort);

// list all the posts from a user (minus the ones with a blogID)
// /user/:id/posts/:sort
// criteria = {
//   userId: req.params.id,
//   blogId: undefined // blogId: { eq: undefined ... isUndefined }
// }
// const query = User.find(criteria)
// query.sort({postDate : req.params.sort === 'oldest' ? 1 : -1})
// query.exec( ....



// frontend component - posts.findByUser(this.user.id, this.sort)
// frontend service - http.get(baseUrl + '/user/' + userID + '/posts/' + sort);

// list all the posts from a user (minus the ones with a blogID)
// /user/:id/blogs/:id/posts/:sort
// criteria = {
//   userId: req.params.id,
//   blogId: undefined // blogId: { eq: undefined ... isUndefined }
// }
// const query = User.find(criteria...



module.exports = router;
