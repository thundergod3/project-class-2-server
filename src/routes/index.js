import facultyRoute from "./faculty.route.js";
import majorRoute from "./major.route.js";
import userRoute from "./user.route.js";
import moduleRoute from "./module.route.js";
import topicRoute from "./topic.route.js";
import documentRoute from "./document.route.js";
import outlineRoute from "./outline.route.js";
import authRoute from "./auth.route.js";

const routes = (express) => {
  express.use("/faculties", facultyRoute);
  express.use("/majors", majorRoute);
  express.use("/users", userRoute);
  express.use("/modules", moduleRoute);
  express.use("/topics", topicRoute);
  express.use("/documents", documentRoute);
  express.use("/outlines", outlineRoute);
  express.use("/auth", authRoute);
};

export default routes;
