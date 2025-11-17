"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel = require("../users/user.model");
const courseModel = require("./course.model");
const responseBase = require("../../utils/responseBase");
async function getAllCourses(req, res) {
    try {
        const courses = await courseModel.find().populate("author", "-posts");
        res.json(responseBase.success(courses));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to fetch courses", error.message));
    }
}
async function getCourseById(req, res) {
    try {
        const course = await courseModel
            .findById(req.params.id)
            .populate("author", "-posts");
        if (!course)
            return res.status(404).json(responseBase.fail("Course not found"));
        res.json(responseBase.success(course));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to fetch course", error.message));
    }
}
// Create course
async function createCourse(req, res) {
    try {
        const { title, image, description, level, duration, content, author, curriculums, } = req.body;
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
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to create course", error.message));
    }
}
// Update course
async function updateCourse(req, res) {
    try {
        const { title, image, description, level, duration, content, author, curriculums, } = req.body;
        const updatedCourse = await courseModel.findByIdAndUpdate(req.params.id, { title, description, level, duration, content, author, curriculums }, { new: true });
        if (!updatedCourse)
            return res.status(404).json(responseBase.fail("Course not found"));
        res.json(responseBase.success(updatedCourse, "Course updated successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json(responseBase.fail("Failed to update course", error.message));
    }
}
async function deleteCourseById(req, res) {
    try {
        const deletedCourse = await courseModel.findByIdAndDelete(req.params.id);
        if (!deletedCourse)
            return res.status(404).json(responseBase.fail("Course not found"));
        res.json(responseBase.success(deletedCourse, "Course deleted successfully"));
    }
    catch (error) {
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
//# sourceMappingURL=course.service.js.map