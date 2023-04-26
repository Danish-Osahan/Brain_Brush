import express from 'express';
import * as dotenv from 'dotenv';
import {v2 as cloudinary } from 'cloudinary';
import Post from '../models/post.js'

dotenv.config()

const router=express.Router();

cloudinary.config({
    api_key: "532972659641584",
    cloud_name: "dqqfrwrk4",
    api_secret:"kKdmid_AB7WKj_Fada-2xqDWZPQ"

})

// router.route("/").get(async(req,res)=>{
//   res.status(200).json({message:'Post routes'})
// })
// GET ALL  POSTS
router.route("/").get(async (req,res)=>{
  try {
    const posts=Post.find({});

    res.status(200).json({success:true,data:posts});
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error})

  }
})

//CREATE POSTS
router.route('/').post(async (req,res)=>{
  try {
    const {name,prompt,photo}=req.body;
    const photoUrl = await cloudinary.uploader.upload(photo)
    const newPost =Post.create({
     name,
     prompt,
     photo:photoUrl.url
    })
    res.status(200).json({success:true,data:newPost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:error})
  }
});

export default router;