import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";

export interface ISPODataService {
    setContext(context: AdaptiveCardExtensionContext);
    getIncidentItems(): Promise<any>;
    getPriorityChoices(): Promise<any>;
    reportIncident(incidentData: any): Promise<any>;
}