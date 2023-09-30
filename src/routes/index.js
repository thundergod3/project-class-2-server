import facultyRoute from "./faculty.route.js";
import majorRoute from "./major.route.js";
import userRoute from "./user.route.js";
import moduleRoute from "./module.route.js";
import topicRoute from "./topic.route.js";
import documentRoute from "./document.route.js";

const routes = (express) => {
  express.use("/faculty", facultyRoute);
  express.use("/major", majorRoute);
  express.use("/user", userRoute);
  express.use("/module", moduleRoute);
  express.use("/topic", topicRoute);
  express.use("/document", documentRoute);
};

export default routes;
