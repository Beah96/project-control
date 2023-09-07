import { NextFunction, Request, Response } from "express";
import { client } from "../database/database";
import { DeveloperResult } from "../interfaces";
import { AppError } from "../error";
import format from "pg-format";
import { DevInfoResult, OS } from "../interfaces/developer.interface";

const verifyID = async(
    request : Request,
    response : Response,
    next : NextFunction
): Promise <void> => {
    const queryString : string= format(`
    SELECT * FROM developers
    WHERE id = $1;`)

    const queryResult : DeveloperResult = await client.query(queryString, [request.params.id])

    if(queryResult.rowCount === 0 ){
        throw new AppError("Developer not found.", 404)
    }
    

    return next()
}

const verifyDevInfoId =async (
    request : Request,
    response : Response,
    next : NextFunction
    ): Promise <void> => {

    const queryString = format(`
            SELECT * FROM "developerInfos"
            WHERE "developerId" = $1;
    `)

    const queryResult : DevInfoResult = await client.query(queryString, [request.params.id])

    if(queryResult.rowCount === 0){
        return next()
    }
    
    throw new AppError("Developer infos already exists.", 409)
}

const verifyOS = (
    request : Request,
    response : Response,
    next : NextFunction
    ) : void =>{

 

        if( request.body.preferredOS as OS){
            return next()
        }
        
        throw new AppError("Invalid OS option.", 400 )
        
}



export { verifyID, verifyDevInfoId, verifyOS }