---
title: Zighang Onboarding Personalization
summary: Sign-up prompts and onboarding-based personalization for the job platform Zighang
period: 2025.08 ~ 2025.09
sort: 202508
org: Corporate partner project (with Zighang)
symbol: BriefcaseBusiness
primary: strategy
also: [data]
roles: [PM, Service planning]
award: Excellence Award (2nd place), corporate project final presentation
stack: [Notion, FigJam, Figma, Maze, React, Spring Boot, Clova OCR, GPT API]
links:
  notion: https://u--x.notion.site/2970fb8090ab800595c4ea592053a48f
---

## Problem

The platform had a low sign-up conversion rate of 0.66%, and searching for job postings was tiring.

## Approach

- Built a 3-layer personalization strategy from 10 in-depth interviews and a survey of 120 people: smart onboarding → AI hyper-personalized recommendations → real-time search assistance.
- Structured onboarding as 5 required questions, an optional upload (cover letter/resume), and a completion carousel, and wrote a feature spec of about 50 items.
- Designed a cover letter analysis pipeline: OCR → normalization → GPT skill mapping → visualized recommendation reasons.
- Designed a real-time ranking over a 3-hour window (Score = 0.2×Views + 0.3×Bookmarks + 0.5×ApplyClicks).
- Compared LLM models and designed a setup that cuts cost per request from $0.0055 to $0.00044 (about 90% savings).
- Led FE/BE API discussions and pitched the final result to company stakeholders myself.

## Outcome

- Excellence Award (2nd place), corporate project final presentation
