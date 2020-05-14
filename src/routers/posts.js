const express = require('express');
const Post = require('../model/posts');
const router = new express.Router();
const auth = require("../middleware/auth");
const { sendMail, sendResetTokenEmail } = require("../emails/account");
const { common } = require("../common");


router.post('/createPost', async (req, res) => {
   try {
      /*
      const oldUser = await User.findOne({ email: req.body.email });
      if (oldUser) {
         return common.error(res, 'Email is already registered.');
      } */
      const post = new Post(req.body);
      await post.save();
      sendMail(post.email, post.name);
      common.success(res, {result:{ message: "Requested sent" }} );
   } catch (e) {
      common.fail(res, e);
   }
});

router.post('/postList', auth, async(req, res) => {
   const filter = req.body.filter;
   const index = parseInt(req.body.page.index);
   const size = parseInt(req.body.page.size);
   try {
      const total = await Post.find(filter);
      const posts = await Post.find({}).skip((index * size)).limit(size);
      common.success(res, {
         result: posts,
         page: {
            total: total.length,
            index: index
         }
      });
   } catch (e) {
      common.fail(res, e);
   }
});

module.exports = router;