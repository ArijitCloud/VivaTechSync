import { AdaptiveCardExtensionContext } from "@microsoft/sp-adaptive-card-extension-base";
import { getIncidentsApiUri, priorityFieldsApiUri, incidentsApiUri } from "../common/Constants";
import { ISPODataService } from "./ISPODataService";
import { SPHttpClient, ISPHttpClientOptions } from "@microsoft/sp-http";

export class SPODataService implements ISPODataService {
    private _context: AdaptiveCardExtensionContext;

    public setContext(context: AdaptiveCardExtensionContext) {
        this._context = context;
    }

    public getIncidentItems(): Promise<any> {
        return this._context.spHttpClient
            .get(`${this._context.pageContext.web.absoluteUrl}${getIncidentsApiUri}`, SPHttpClient.configurations.v1)
            .then(d => d.json())
            .catch(err => console.log(err));
    }

    public getPriorityChoices(): Promise<any> {
        return this._context.spHttpClient
            .get(`${this._context.pageContext.web.absoluteUrl}${priorityFieldsApiUri}`, SPHttpClient.configurations.v1)
            .then(d => d.json())
            .catch(err => console.log(err));
    }

    public reportIncident(incidentData: any): Promise<any> {

        const option: ISPHttpClientOptions = {
            body: JSON.stringify(incidentData),
            headers: {
                'accept': 'application/json;odata.metdata=none'
            }
        };

        return this._context.spHttpClient
            .post(`${this._context.pageContext.web.absoluteUrl}${incidentsApiUri}`, SPHttpClient.configurations.v1, option)
            .then(d => d.json())
            .catch(err => console.log(err));
    }
}

export const spoService = new SPODataService();