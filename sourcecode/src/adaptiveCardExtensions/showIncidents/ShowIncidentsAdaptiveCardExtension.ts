import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { ShowIncidentsPropertyPane } from './ShowIncidentsPropertyPane';
import { spoService } from '../../services/SPODataService';
import { IncidentStatus, ListName } from '../../common/Constants';

export interface IShowIncidentsAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IShowIncidentsAdaptiveCardExtensionState {
  incidentListUrl: string;
  openIncidentCount: number;
  inProgressIncidentCount: number;
}

const CARD_VIEW_REGISTRY_ID: string = 'ShowIncidents_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'ShowIncidents_QUICK_VIEW';

export default class ShowIncidentsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IShowIncidentsAdaptiveCardExtensionProps,
  IShowIncidentsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: ShowIncidentsPropertyPane | undefined;

  public onInit(): Promise<void> {    

    this.state = {
      incidentListUrl: `${this.context.pageContext.web.absoluteUrl}/lists/${ListName}`,
      openIncidentCount: 0,
      inProgressIncidentCount: 0
    };

    spoService.setContext(this.context);

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return spoService.getIncidentItems()
      .then(result => {
        let openItems = [];
        let inProgressItems = [];
        if (result.value && result.value.length > 0) {
          openItems = result.value.filter(r => r.Status === IncidentStatus.Open);
          inProgressItems = result.value.filter(r => r.Status === IncidentStatus.InProgress);
        }

        this.setState({ openIncidentCount: openItems.length, inProgressIncidentCount: inProgressItems.length });
      });
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'ShowIncidents-property-pane'*/
      './ShowIncidentsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.ShowIncidentsPropertyPane();
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
