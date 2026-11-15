---
title: LOGUE
summary: An AI service that connects data sources and analyzes them through conversation (Ewha Womans University 2026 capstone)
period: 2026.03 ~ 2026.06
sort: 202603.5
org: Ewha Womans University Capstone Design · 26-ewha-capstone-logue
symbol: MessageSquareText
primary: development
also: [data, strategy]
roles: [Planning, FE, API design]
stack: [TypeScript, React, Swagger · OpenAPI, GitHub Actions, Codex · Claude review skills]
---

## Role

Set up the capstone team's GitHub organization and its FE, BE, AI, and docs repos, and opened 115 PRs to the main repo over the project.

## Approach

- **FE architecture refactoring**: Moved code into feature layers and drew clear boundaries for shared component exports, the dataSource API, and the analysis chat hooks and rendering.
- **API contract hardening**: Strengthened the analysis AI API contract and Swagger integration, and aligned the data source deletion API contract.
- **Auth flow cleanup**: Separated the auth provider flows and consolidated the auth lifecycle policy in one place. Also fixed a 401 error on login session restore.
- **Refactoring backlog**: Built a backlog from code scans and worked through it PR by PR. Added 2 AI skills for code review and refactoring to the team.
- **AI analysis demo MVP**: Built a demo first in a separate repo and deployed it to GitHub Pages to validate the direction.

## Related

To define LOGUE's target users, I built a separate research pipeline that extracts persona evidence from public community data. Details are in the Persona Pipeline project.
