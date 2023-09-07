import { Router } from "express";
import { developerControllers } from "../controllers";
import middlewares from "../middlewares";


const developerRouter : Router = Router()

developerRouter.post("", middlewares.verifyEmail, developerControllers.createDeveloper)

developerRouter.get("/:id", middlewares.verifyID, developerControllers.getDeveloperById )

developerRouter.patch("/:id",middlewares.verifyID, middlewares.verifyEmail, developerControllers.updateDeveloper )

developerRouter.delete("/:id", middlewares.verifyID, developerControllers.deleteDeveloper)

developerRouter.post("/:id/infos", middlewares.verifyOS, middlewares.verifyID, middlewares.verifyDevInfoId, developerControllers.addInfoToDev)

export default developerRouter