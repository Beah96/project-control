import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { DeveloperResult, ProjecResult } from "../interfaces";
import { client } from "../database/database";
import { AppError } from "../error";

const verifyDevProjecId =async ( 
    request : Request,
    response : Response,
    next : NextFunction)  : Promise<void> => {

        const queryString : string= format(`
        SELECT * FROM developers
        WHERE id = $1;`) 
        
       
            const queryResult : DeveloperResult = await client.query(queryString, [request.body.developerId])
           
            if(queryResult.rowCount === 0){
                throw new AppError("Developer not found.", 404)
            }
    
            return next()
            

}

const verifyProjectId =async (
    request : Request,
    response : Response,
    next : NextFunction
) : Promise<void> => {
    const queryString : string = format(`
    SELECT * FROM projects
    WHERE id = $1;`)
    
    const queryResult : ProjecResult = await client.query(queryString, [request.params.id])

    if(queryResult.rowCount === 0){
        throw new AppError("Project not found.", 404)
    }

    return next()
}

export { verifyProjectId, verifyDevProjecId }