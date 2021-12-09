import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ShowIncidentsAdaptiveCardExtensionStrings';
import { IShowIncidentsAdaptiveCardExtensionProps, IShowIncidentsAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../ShowIncidentsAdaptiveCardExtension';

export class CardView extends BasePrimaryTextCardView<IShowIncidentsAdaptiveCardExtensionProps, IShowIncidentsAdaptiveCardExtensionState> {
  // public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
  //   return [
  //     {
  //       title: strings.QuickViewButton,
  //       action: {
  //         type: 'QuickView',
  //         parameters: {
  //           view: QUICK_VIEW_REGISTRY_ID
  //         },
  //       }
  //     }
  //   ];
  // }

  public get data(): IPrimaryTextCardParameters {
    return {
      primaryText: `${this.state.openIncidentCount} Open`,
      description: `${this.state.inProgressIncidentCount} In Progress`
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: this.state.incidentListUrl
      }
    };
  }
}
