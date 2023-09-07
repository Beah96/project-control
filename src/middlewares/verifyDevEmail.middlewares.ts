import { NextFunction, Request, Response } from "express";
import { DeveloperResult } from "../interfaces";
import { client } from "../database/database";
import { AppError } from "../error";
import format from "pg-format";

const verifyEmail =async (
    request : Request,
    response : Response, 
    next : NextFunction
) : Promise<void> => {

    const queryString : string = format(`
    SELECT * FROM developers
    WHERE email = $1;
    `)
    const queryResult : DeveloperResult = await client.query(queryString, [request.body.email])

    if(queryResult.rowCount){
        throw new AppError("Email already exists.", 409)
    }

    return next()
    
}

export { verifyEmail }