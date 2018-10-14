const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Blog = require('../models/user');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId:      { type: Schema.Types.ObjectId, ref: 'User' },
  blogId:      { type: Schema.Types.ObjectId, ref: 'Blog' },
  postTitle:   { type: String },
  postContent: { type: String },
  postDate:    { type: Date }
});


PostSchema.methods.asData = function() {
  return {
    id: this._id,
    userId: this.userId,
    blogId: this.blogId,
    postTitle: this.postTitle,
    postContent: this.postContent,
    postDate: this.postDate,
  };
};

const Post = mongoose.model('Post', PostSchema);

module.exports = {
  Post
};
