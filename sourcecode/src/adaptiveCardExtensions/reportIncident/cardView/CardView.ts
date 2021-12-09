import {
  BasePrimaryTextCardView,
  IBasicCardParameters,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  BaseBasicCardView
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ReportIncidentAdaptiveCardExtensionStrings';
import { IReportIncidentAdaptiveCardExtensionProps, IReportIncidentAdaptiveCardExtensionState, REPORT_VIEW_REGISTRY_ID } from '../ReportIncidentAdaptiveCardExtension';

export class CardView extends BaseBasicCardView<IReportIncidentAdaptiveCardExtensionProps, IReportIncidentAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: REPORT_VIEW_REGISTRY_ID
          }
        },
        style: "positive"
      }
    ];
  }

  public get data(): IBasicCardParameters {
    return {
      primaryText: this.properties.primaryText || strings.PrimaryText
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'QuickView',
      parameters: {
        view: REPORT_VIEW_REGISTRY_ID
      }
    };
  }
}
