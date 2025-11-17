const userModel = require("../users/user.model");
const courseModel = require("./course.model");
const responseBase = require("../../utils/responseBase");
import type { Request, Response } from "express";

async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await courseModel.find().populate("author", "-posts");
    res.json(responseBase.success(courses));
  } catch (error: any) {
    res
      .status(500)
      .json(responseBase.fail("Failed to fetch courses", error.message));
  }
}

async function getCourseById(req: Request, res: Response) {
  try {
    const course = await courseModel
      .findById(req.params.id)
      .populate("author", "-posts");
    if (!course)
      return res.status(404).json(responseBase.fail("Course not found"));
    res.json(responseBase.success(course));
  } catch (error: any) {
    res
      .status(500)
      .json(responseBase.fail("Failed to fetch course", error.message));
  }
}

// Create course
async function createCourse(req: Request, res: Response) {
  try {
    const {
      title,
      image,
      description,
      level,
      duration,
      content,
      author,
      curriculums,
    } = req.body;

    const newCourse = new courseModel({
      title,
      image,
      description,
      level,
      duration,
      content,
      author,
      curriculums,
    });

    await newCourse.save();

    res
      .status(201)
      .json(responseBase.success(newCourse, "Course created successfully"));
  } catch (error: any) {
    res
      .status(500)
      .json(responseBase.fail("Failed to create course", error.message));
  }
}

// Update course
async function updateCourse(req: Request, res: Response) {
  try {
    const {
      title,
      image,
      description,
      level,
      duration,
      content,
      author,
      curriculums,
    } = req.body;

    const updatedCourse = await courseModel.findByIdAndUpdate(
      req.params.id,
      { title, description, level, duration, content, author, curriculums },
      { new: true }
    );

    if (!updatedCourse)
      return res.status(404).json(responseBase.fail("Course not found"));

    res.json(
      responseBase.success(updatedCourse, "Course updated successfully")
    );
  } catch (error: any) {
    res
      .status(500)
      .json(responseBase.fail("Failed to update course", error.message));
  }
}

async function deleteCourseById(req: Request, res: Response) {
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(req.params.id);
    if (!deletedCourse)
      return res.status(404).json(responseBase.fail("Course not found"));
    res.json(
      responseBase.success(deletedCourse, "Course deleted successfully")
    );
  } catch (error: any) {
    res
      .status(500)
      .json(responseBase.fail("Failed to delete course", error.message));
  }
}

// CommonJS export
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourseById,
};
