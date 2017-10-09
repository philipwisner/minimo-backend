const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user')

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  userId:          { type: Schema.Types.ObjectId, ref: 'User' },
  blogName:        { type: String },
  blogDescription: { type: String },
  blog_image:      { type: String },
  blogDate:        { type: Date }
});

BlogSchema.methods.asData = function() {
  return {
    id: this._id,
    userId: this.userId,
    blogName: this.blogName,
    blogDescription: this.blogDescription,
    blogImage: this.blogImage,
    blogDate: this.blogDate,
  };
};

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = {
  Blog
};
