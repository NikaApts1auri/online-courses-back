const { Router } = require("express");
const curseService = require("./curse.service"); // object with exported functions
const isAuthMiddleware = require("../../middlewares/isAuth.middleware");
const validateMiddleware = require("../../middlewares/validate.middleware");
const { courseSchema } = require("../../validations/curse/courseValidator");

const curseRouter = Router();

console.log(curseService);

curseRouter.get("/", curseService.getAllCourses);
curseRouter.get("/:id", isAuthMiddleware, curseService.getCourseById);
curseRouter.post(
  "/",
  isAuthMiddleware,
  validateMiddleware(courseSchema),
  curseService.createCourse
);
curseRouter.patch(
  "/:id",
  isAuthMiddleware,
  validateMiddleware(courseSchema),
  curseService.updateCourse
);
curseRouter.delete("/:id", isAuthMiddleware, curseService.deleteCourseById);

module.exports = curseRouter;
