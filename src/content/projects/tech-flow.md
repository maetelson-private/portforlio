---
title: tech-flow
summary: A node editor for user flows and architecture that keeps planners and developers on the same structure
period: 2026.03
sort: 202603.2
org: Personal project
primary: development
also: [design]
roles: [Design, FE]
stack: [TypeScript, Node Editor, Figma]
links:
  repo: https://github.com/maetelson/tech-flow
  figma: https://www.figma.com/design/ROtBCTIVtkTIRmyjIr9sO9/tech-flow
---

## Problem

When complex feature flows are described only in documents and conversation, the links between input, validation, API calls, AI processing, and DB writes get blurry. Planners and developers struggle to share the same structure.

## Approach

- Flows are drawn as nodes and edges, and each node and edge can hold a description, Markdown notes, and JSON metadata.
- Flows are grouped into `frontend` · `backend` · `ai` · `database` · `external api` categories.
- Multiple flows can be managed separately, saved in the browser, and exported as images.
- Flows made locally are bundled as the initial screen at deploy time, so the deployed version shows examples right away.
- Designed it in Figma myself before building it.
