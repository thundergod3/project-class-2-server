import facultyRoute from "./faculty.route.js";
import majorRoute from "./major.route.js";
import teacherRoute from "./teacher.route.js";
import moduleRoute from "./module.route.js";

const routes = (express) => {
  express.use("/faculty", facultyRoute);
  express.use("/major", majorRoute);
  express.use("/teacher", teacherRoute);
  express.use("/module", moduleRoute);
};

export default routes;
