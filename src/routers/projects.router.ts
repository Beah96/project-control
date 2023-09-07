import { Router } from "express";
import middlewares from "../middlewares";
import { projectsControllers } from "../controllers";

const projectRouter : Router = Router()

projectRouter.post("", middlewares.verifyDevProjecId, projectsControllers.createProject)
projectRouter.get("/:id", middlewares.verifyProjectId, projectsControllers.getProjectById)
projectRouter.patch("/:id",middlewares.verifyProjectId, middlewares.verifyDevProjecId, projectsControllers.updateProject)

export default projectRouter    