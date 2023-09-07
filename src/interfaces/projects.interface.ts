import { QueryResult } from "pg"

type Project = {
    id: number,
    name: string,
    description: string,
    repository: string,
    startDate: Date,
    endDate?: Date | null,
    developerId?: number | null
}

type ProjecResult = QueryResult<Project>
type ProjectCreate = Omit<Project, "id">

export{
    Project,
    ProjecResult,
    ProjectCreate
}