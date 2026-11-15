---
title: Persona Pipeline
summary: A research pipeline that keeps only the personas backed by verified evidence from public community data
period: 2026.04 ~ 2026.07
sort: 202604.5
org: LOGUE capstone · Personal research engineering
primary: data
also: [development, strategy]
roles: [Pipeline design, Data engineering, Research]
featured: true
stack: [Python 3.11, parquet, Rule + LLM Labeling, Clustering, Quality Gates, unittest]
links:
  repo: https://github.com/maetelson/persona-pipeline
---

## Problem

LLMs can produce convincing personas from weak evidence. Community data is noisy, full of duplicates, and varies in reliability by source. Even when two posts describe the same pain point, a Stack Overflow debugging thread and a Reddit complaint are not equally reliable as evidence.

## Approach

- **Staged pipeline**: Collection → normalization → noise filter → relevance filter → episode building → rule/LLM labeling → axis discovery → clustering and scoring → quality gates → workbook output. Each stage can be rerun, and intermediate results are saved to files so I can trace what changed and where.
- **Quality gates**: Separate checks for coverage, source balance, source concentration, weak-source debt, and evidence for representative cases.
- **Separate judgment levels**: Judged whether each persona is "claimable" separately from whether the whole workbook is "deck-ready," so one interesting cluster isn't mistaken for a finished persona set.

## Outcome

- 3 personas ready for final use, 1 open for conditional review
- Clusters without enough evidence were not promoted and kept for diagnostics only
- The workbook as a whole still has a source balance issue, so it was set at "reviewable, not for presentations"
