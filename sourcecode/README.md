# incident-management

## Summary

Two adaptive cards are part of the solution
- One shows number of incidents that are open and in progress.
- The other is able to save incident details in a SharePoint list using a form like UI.


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

>This require set up a SharePoint List(Blank Template) named "Incident Management" with below columns

- Description : Multiline Text 
- Priority: Choice (Low, Medium, High) 
- Status: Choice (In Progress, Open, Closed)

## Solution Incident Reporting Adaptive Card

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| Incident Reporting | Arijit Mondal |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | ---------------  |
| 1.0     | December 09, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve --nobrowser**

> Open the sharepoint workbench from https://yoursiteurl/_layouts/15/workbench.aspx
- Add the card



## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
