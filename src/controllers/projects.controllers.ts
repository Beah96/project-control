import { Request, Response } from "express";
import { Project } from "../interfaces";
import projectsServices from "../services/projects.services";

const createProject =async ( request : Request, response : Response) : Promise<Response> => {
    const project : Project = await projectsServices.createProject(request.body)

    return response.status(201).json(project)
}

const getProjectById =async (request : Request, response : Response) : Promise<Response> => {
    const projectById = await projectsServices.getProjectById(request.params.id)

    return response.status(200).json(projectById)
}

const updateProject =async (request : Request, response : Response) : Promise<Response> => {
    const updatedProject = await projectsServices.updateProject(request.body, request.params.id)

    return response.status(200).json(updatedProject)
}

export default{
    createProject,
    getProjectById,
    updateProject
}