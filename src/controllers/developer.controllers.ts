import { Request, Response } from "express";
import { Developer } from "../interfaces";
import { developerServices } from "../services";
import { DevInfoCreate } from "../interfaces/developer.interface";

const createDeveloper = async(request: Request, response : Response) : Promise<Response> =>{
    const developer : Developer = await developerServices.createDeveloper(request.body)

    return response.status(201).json(developer)
}

const getDeveloperById = async (request: Request, response : Response): Promise<Response> => {
    const developerById = await developerServices.getDeveloperById(request.params.id)
    return response.status(200).json(developerById)
}

const updateDeveloper = async (request: Request, response : Response): Promise<Response> =>{
    const updatedDev = await developerServices.updateDeveloper(request.body, request.params.id)

    return response.status(200).json(updatedDev)
}

const deleteDeveloper =async (request: Request, response : Response): Promise<Response> => {
    await developerServices.deleteDeveloper(request.params.id)

    return response.status(204).json()
}

const addInfoToDev =async (request: Request, response : Response) : Promise<Response> => {
    const payload : DevInfoCreate = {...request.body, "developerId": request.params.id}
    const infoAdded = await developerServices.addInfoToDev(payload)
    return response.status(201).json(infoAdded)
}


export default { 
    createDeveloper, 
    getDeveloperById, 
    updateDeveloper, 
    deleteDeveloper, 
    addInfoToDev 
}