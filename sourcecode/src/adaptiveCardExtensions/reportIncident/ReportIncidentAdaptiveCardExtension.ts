import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { ReportIncidentPropertyPane } from './ReportIncidentPropertyPane';
import { ReportIncidentView } from './quickView/ReportIncidentView';
import { spoService } from '../../services/SPODataService';

export interface IReportIncidentAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
  primaryText: string;
}

export interface IReportIncidentAdaptiveCardExtensionState {
  priorityItems: any[];
}

const CARD_VIEW_REGISTRY_ID: string = 'ReportIncident_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'ReportIncident_QUICK_VIEW';
export const REPORT_VIEW_REGISTRY_ID: string = 'ReportIncident_REPORT_VIEW';

export default class ReportIncidentAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IReportIncidentAdaptiveCardExtensionProps,
  IReportIncidentAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: ReportIncidentPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      priorityItems: []
    };

    spoService.setContext(this.context);

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());
    this.quickViewNavigator.register(REPORT_VIEW_REGISTRY_ID, () => new ReportIncidentView());

    spoService.getPriorityChoices()
      .then(d => {
        if (d.value && d.value.length > 0) {
          const choices = d.value[0].Choices.map((c, index) => ({ choice: c, value: index.toString() }));
          this.setState({ priorityItems: choices });
          console.log(choices);
        }
      });

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'ReportIncident-property-pane'*/
      './ReportIncidentPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.ReportIncidentPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
