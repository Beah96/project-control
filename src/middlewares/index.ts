import { handleError } from "./handleError.middlewares";
import { verifyEmail } from "./verifyDevEmail.middlewares";
import { verifyID, verifyDevInfoId, verifyOS } from "./verifyDevId.middlewares";
import { verifyProjectId, verifyDevProjecId } from "./verifyProjectId.middlewares";

export default {
    handleError,
    verifyEmail,
    verifyID,
    verifyDevInfoId,
    verifyOS,
    verifyProjectId,
    verifyDevProjecId 
}