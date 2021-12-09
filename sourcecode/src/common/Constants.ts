export const ListName = "Incident Management";
const getIncidentQuery = "?$select=ID,Title,Status&$count=true&$filter=(Status eq 'Open') or (Status eq 'In Progress')";
export const incidentsApiUri = `/_api/web/lists/getbyTitle('${ListName}')/items`;
export const priorityFieldsApiUri = `/_api/web/lists/getbyTitle('${ListName}')/fields?$filter=EntityPropertyName eq 'Priority'`;
export const getIncidentsApiUri = `${incidentsApiUri}${getIncidentQuery}`;

export enum IncidentStatus{
    Open='Open',
    InProgress='In Progress'
}
