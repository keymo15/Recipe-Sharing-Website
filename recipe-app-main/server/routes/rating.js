const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.reviews.push(req.body);

    // const reviewArr = post.reviews;
    // for(let i=0; i<=reviewArr.length; i++){

    // }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
