"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const courseService = require("./course.service");
const isAuthMiddleware = require("../../middlewares/isAuth.middleware");
const validateMiddleware = require("../../middlewares/validate.middleware");
const { courseSchema } = require("../../validations/course/courseValidator");
const courseRouter = Router();
courseRouter.get("/", courseService.getAllCourses);
courseRouter.get("/:id", isAuthMiddleware, courseService.getCourseById);
courseRouter.post("/", 
// isAuthMiddleware,
validateMiddleware(courseSchema), courseService.createCourse);
courseRouter.patch("/:id", isAuthMiddleware, validateMiddleware(courseSchema), courseService.updateCourse);
courseRouter.delete("/:id", isAuthMiddleware, courseService.deleteCourseById);
module.exports = courseRouter;
//# sourceMappingURL=course.controller.js.map