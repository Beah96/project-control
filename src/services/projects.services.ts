import format from "pg-format";
import { ProjecResult, Project, ProjectCreate } from "../interfaces";
import { client } from "../database/database";

const createProject =async (payload: ProjectCreate) : Promise<Project> => {
    const queryString : string = format(`
    INSERT INTO projects
    (%I)
    VALUES (%L)
    RETURNING *;
    `, Object.keys(payload),
    Object.values(payload))

    const queryResult : ProjecResult = await client.query(queryString)

    return queryResult.rows[0]
}

const getProjectById =async (projectId : string) : Promise<Project> => {
    const queryString : string = format(`
    SELECT 
    P.id AS "projectId",
    p.name AS "projectName",
    p.description AS "projectDescription",
    p.repository AS "projectRepository",
    p."startDate" AS "projectStartDate",
    p."endDate" AS "projectEndDate",
    d.name AS "projectDeveloperName"
    FROM projects AS p
    LEFT JOIN developers as d
        ON p."developerId" = d.id
    WHERE p.id = $1;
    `)
    
    const queryResult : ProjecResult = await client.query(queryString, [projectId])

    return queryResult.rows[0]
    
}

const updateProject =async (payload: ProjectCreate, projectId : string) : Promise<Project> => {
    const queryString : string = format(`
    UPDATE projects
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;`, Object.keys(payload),
    Object.values(payload))

    const queryResult : ProjecResult = await client.query(queryString, [projectId])

    return queryResult.rows[0]
}

export default {
    createProject,
    getProjectById,
    updateProject
}