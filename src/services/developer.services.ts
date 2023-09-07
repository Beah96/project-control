import format from "pg-format";
import { Developer, DeveloperCreate, DeveloperResult } from "../interfaces";
import { client } from "../database/database";
import { DevInfo, DevInfoCreate, DevInfoResult } from "../interfaces/developer.interface";

const createDeveloper = async(payload : DeveloperCreate) : Promise<Developer> =>{
    const queryString : string = format(`
    INSERT INTO developers
    (%I)
    VALUES (%L)
    RETURNING *;
    `, Object.keys(payload),
    Object.values(payload)
    )

    const queryResult : DeveloperResult = await client.query(queryString)

    return queryResult.rows[0]
}

const getDeveloperById = async (userId : string) : Promise<Developer> => {
    const queryString : string = format(`
    SELECT 
    d.id AS "developerId", 
    d.name AS "developerName", 
    d.email AS "developerEmail", 
    i."developerSince" AS "developerInfoDeveloperSince", 
    i."preferredOS" AS "developerInfoPreferredOS"
    FROM developers AS d
    LEFT JOIN "developerInfos" AS i
        ON d.id = i."developerId"
        WHERE d.id = $1;
    `)

    const queryResult : DeveloperResult = await client.query(queryString, [userId])

    return queryResult.rows[0]
}

const updateDeveloper =async (payload : DeveloperCreate, userId : string) : Promise<Developer> => {
    const queryString : string = format(`
    UPDATE developers
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
    `, Object.keys(payload),
    Object.values(payload)
    );

    const queryResult : DeveloperResult = await client.query(queryString, [userId])

    return queryResult.rows[0]
}

const deleteDeveloper =async (userId : string): Promise<void> => {
    const queryString : string = format(`
        DELETE FROM developers WHERE id = $1;
    `)
    await client.query(queryString, [userId])
}

const addInfoToDev =async (payload : DevInfoCreate): Promise<DevInfo> => {
    const queryString : string = format(`
    INSERT INTO "developerInfos"
    (%I)
    VALUES (%L)
    RETURNING *;
    `, Object.keys(payload),
    Object.values(payload)
    );

    const queryResult : DevInfoResult = await client.query(queryString)

    return queryResult.rows[0]
}


export default {
    createDeveloper, 
    getDeveloperById, 
    updateDeveloper, 
    deleteDeveloper, 
    addInfoToDev
}