import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ReportIncidentAdaptiveCardExtensionStrings';
import { IReportIncidentAdaptiveCardExtensionProps, IReportIncidentAdaptiveCardExtensionState } from '../ReportIncidentAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  description: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IReportIncidentAdaptiveCardExtensionProps,
  IReportIncidentAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: "",
      title: "Incident Reported",
      description: "Thank you for submitting this incident!"
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}