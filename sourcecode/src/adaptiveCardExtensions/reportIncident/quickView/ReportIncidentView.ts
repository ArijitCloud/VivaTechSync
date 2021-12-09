import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ReportIncidentAdaptiveCardExtensionStrings';
import { spoService } from '../../../services/SPODataService';
import { IReportIncidentAdaptiveCardExtensionProps, IReportIncidentAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../ReportIncidentAdaptiveCardExtension';

export interface IQuickViewData {
  priorityItems: any[];
}

export class ReportIncidentView extends BaseAdaptiveCardView<
  IReportIncidentAdaptiveCardExtensionProps,
  IReportIncidentAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      priorityItems: this.state.priorityItems
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/ReportIncidentTemplate.json');
  }

  public onAction(action: IActionArguments | any) {
    const incidentData = {
      Title: action.data.title,
      Priority: this.state.priorityItems.filter(p=>p.value===action.data.priority)[0].choice,
      Description: action.data.description
    };

    spoService.reportIncident(incidentData)
      .then(d => {
        this.quickViewNavigator.replace(QUICK_VIEW_REGISTRY_ID);
      });
  }
}