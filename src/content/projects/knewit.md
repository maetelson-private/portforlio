---
title: KNEWIT
summary: An F&B visit log and recommendation app built on card payment history, for people in their 20s and 30s who don't trust reviews
period: 2026.03 ~ Present
sort: 202603
org: KNEWIT startup team · CEO
symbol: MapPin
primary: development
also: [strategy, design, data]
roles: [CEO, Planning, Design, FE]
featured: true
award: Excellence Award, ICT/SW Women's Startup Competition · Round 2, Startup for Everyone
stack: [React Native, Expo Router, TypeScript, TanStack Query, Zustand, NativeWind, orval, Biome, GitHub Actions, Sentry, PostHog, Figma]
links:
  live: https://knewit-app.github.io/proto/
  notion: https://u--x.notion.site/4000fb8090ab80bdbd83ec753adc5e0e
---

## Problem

Existing place recommendations rely on ads and sponsored content, so they're hard to trust. People in their 20s and 30s want to know "the places people actually go back to."

## Approach

- **3-stage product structure**: Automatic visit logs → place attributes built on layered data → recommendations and social discovery based on real behavior
- **3-layer data source model**: Official and public data / AI extraction from public text / our own payment signals. When the Google Search PoC failed, I traced it to "choosing the wrong source" and switched to the Naver Blog API.
- **Onboarding redesign**: Found that every test user dropped off at the card linking step, and changed the flow to "show the friends map first."
- **Thin client architecture**: Built on React Native (Expo). Generated the API client with orval and set up a 4-level rule system for AI coding agents (CLAUDE.md · Biome · Claude Code hooks · GitHub Actions).
- **Iterative prototype releases**: Shipped the web prototype to GitHub Pages every sprint from v3.6 to v3.11 and verified QA use cases (UC-46~63).
- **Team knowledge base**: Built a wiki repo that syncs Notion research into LLM-friendly Markdown and linked it to the backend code repo as a submodule.

## Outcome

- Excellence Award (3rd place), ICT/SW Women's Startup Competition
- Advanced to round 1 of stage 2 in the "Startup for Everyone" competition (₩2M in startup activity funding)
- Selected for the Come-Up track of ORDA, Ewha Womans University's startup club
- Saved-list import PoC: collected 525 places from Kakao and 998 from Naver
- 55 wireframe frames in Figma
