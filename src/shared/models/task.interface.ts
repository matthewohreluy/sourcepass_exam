export interface Itask{
  taskId: number;
  projectId: number;
  taskName: string;
  totalEstimate: number;
  totalEmployeeEstimate?:number;
  assignedEmployees: {employeeId: number, employeeEstimate: number}[];
}
