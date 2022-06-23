import { Itask } from "./task.interface";

export interface IProject {
  projectId : number;
  projectName: string;
  tasks: Itask[];
}
