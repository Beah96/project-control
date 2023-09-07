import { QueryResult } from "pg"

type Developer ={
    id: number,
    name: string,
    email: string,
} 

type DeveloperResult = QueryResult<Developer>
type DeveloperCreate = Omit<Developer, "id">

type OS = "Windows" | "Linux" | "MacOS"

type DevInfo ={
    id: number,
    developerSince: Date,
    preferredOS: OS,
    developerId: number
}

type DevInfoResult = QueryResult<DevInfo>
type DevInfoCreate = Omit<DevInfo,"id">


export {
    Developer, 
    DeveloperCreate, 
    DeveloperResult,
    DevInfo,
    DevInfoCreate,
    DevInfoResult,
    OS
 }