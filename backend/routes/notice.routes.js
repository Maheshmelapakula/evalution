const express = require("express")
const jwt = require("jsonwebtoken")
const {Notice} = require('../models/Noticemodel');
const { Usermodel } = require("../models/Usermodel");

const noticeRouter = express.Router();

noticeRouter.get("/", async (req, res) => {
    const notices = await Notice.find()
    res.send({notices : notices})
})

exports.createNotice = async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const newNotice = new Notice({
        title,
        content,
        category
      });
      const savedNotice = await newNotice.save();
      res.status(201).json(savedNotice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getAllNotices = async (req, res) => {
    try {
      let notices;
      if (req.query.category) {
        notices = await Notice.find({ category: req.query.category });
      } else {
        notices = await Notice.find();
      }
      res.status(200).json(notices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  exports.updateNotice = async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const updatedNotice = await Notice.findByIdAndUpdate(
        req.params.noticeId,
        { title, content, category },
        { new: true }
      );
      if (!updatedNotice) {
        return res.status(404).json({ message: 'Notice not found' });
      }
      res.status(200).json(updatedNotice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  

