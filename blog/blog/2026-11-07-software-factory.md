---
slug: software-factory
title: "What Is a Software Factory? From Coding Agent to Measurable Workflow"
date: 2026-11-07
authors: reza
category: ai
image: https://sysp0.com/blog/images/software-factory/software-factory-loop-1200.051f415d.webp
tags: [AI, Software Engineering, Agents, Cloudflare, Astro]
description: "How software factories work: Astro's label-driven triage, Vercel's AI SDK results, practical terms, human review, security, and cost."
---

A **software factory** is a repeatable development workflow that moves a work item through investigation, implementation, checks, and a human decision, while keeping the evidence needed to review the result and improve the next run.

A coding agent can fix a bug. The team still needs to know where the report came from, whether the bug was reproduced, what proves the fix, and who approved it. Cloudflare's Astro triage workflow shows how those steps can connect: it investigates reports, prepares preview releases, and asks reporters to verify fixes. Cloudflare reported that open issues fell from more than 200 to about 30 after months of iteration. That is its result for one repository, not a general forecast. [Cloudflare's Astro account](https://blog.cloudflare.com/astro-issue-triage/)

<!-- truncate -->

## TL;DR

- A factory coordinates **tasks, triggers, agent runs, evidence, and human decisions**; a coding agent performs one part of that flow.
- Astro's open-source triage Action tracks each GitHub issue's stage with labels. A reporter can test a preview before a pull request is opened.
- Start with one checkable workflow. Isolate untrusted code and issue text, limit credentials and spending, and measure the review work the automation creates.

## From a coding agent to a workflow

A coding agent works on a task with tools and access. The factory defines where work enters, which step runs next, what each step records, how failures are handled, and when a person decides. Warp describes a loop from triage and specification through implementation, review, shipping, and monitoring. A prompt can direct an agent; the surrounding workflow makes its work traceable. [Warp's software-factory overview](https://www.warp.dev/articles/what-is-a-software-factory)

![Conceptual funnel from a coding agent through cloud automation to a measurable software factory](https://sysp0.com/blog/images/software-factory/software-factory-funnel.6062d99d.webp)

*This is a conceptual map of the workflow, not a prescribed architecture.*

The terms below describe different jobs in that loop. The examples use Astro's triage workflow; where Cloudflare did not report a separate component, the table says so.

| Term | Meaning | Astro example |
| --- | --- | --- |
| **Task** | A type of work that can be repeated. | Investigate a bug report. |
| **Trigger** | An event that starts a run. | A new issue receives the triage label. |
| **Run** | One execution of a task, with a recorded outcome. | One attempt to reproduce and diagnose a report. |
| **Runner** | The environment that executes the work. | A GitHub Actions runner for the triage Action. |
| **Orchestrator** | Chooses and tracks the next step. | The Action reads issue labels and comments to resume the flow. |
| **Scorer** | Evaluates one run against defined criteria. | Tests check a proposed fix; no standalone scorer is reported. |
| **Benchmark** | Compares configurations on the same set of tasks. | Not reported for Astro; the same issues could be replayed to compare setups. |
| **Harness** | Gives an agent its model, instructions, tools, and execution controls. | The agent harness runs the triage skill inside GitHub Actions. |

The issue tracker keeps the conversation, Git holds the proposed change, and logs preserve the evidence. For more of this vocabulary, see [Matt Pocock's skills repository](https://github.com/mattpocock/skills).

## Astro: labels track each report's stage

Cloudflare started with a narrow job: reproducing and triaging bug reports. Its agent skill follows four steps: **reproduce** the report, **diagnose** the cause, **verify** whether the behavior is a bug, and **fix** it with a failing test first. Isolated subagents pass their findings forward in a report. [Cloudflare's technical walkthrough](https://blog.cloudflare.com/astro-issue-triage/)

The workflow's durable state lives in GitHub labels and issue comments. Each label says which stage a report is in, and fixed rules decide how it moves to the next one; engineers call this pattern a state machine. Cloudflare calls the start “triage needed”; the [open-source Action's README](https://github.com/withastro/triagebot-action) lists the configurable default labels more precisely:

| Label | What it means | Next step |
| --- | --- | --- |
| **triage: needs triage** | A new or reopened issue enters investigation. | Reproduce, diagnose, and decide whether a fix is possible. |
| **triage: needs reproduction** | The report lacks enough evidence to reproduce. | Ask for details; new information can restart triage. |
| **triage: fix pending** | A candidate fix and preview are ready. | The reporter tests the preview. |
| **triage: fix rejected** | The reporter says the preview did not fix the issue. | Return to triage with that feedback. |
| **triage: fix verified** | The fix is confirmed. | Open a linked pull request. |

The Action also has outcomes such as **triage: not actionable**, **triage: unable to reproduce**, and **triage: failed**. This table shows the preview-and-confirmation path; the Action can be configured to skip that confirmation step. The issue's labels and comments tell the next run where to resume, so the pipeline does not need another private status record. [Action state diagram](https://github.com/withastro/triagebot-action/blob/main/README.md)

![A bug report passes through investigation and testing before a person approves the result and feedback starts another cycle](https://sysp0.com/blog/images/software-factory/software-factory-bug-review-1200.7070f882.webp)

*The report, preview, reporter feedback, and pull request stay linked to one issue.*

The implementation is open source: [triagebot-action](https://github.com/withastro/triagebot-action) handles GitHub issues. [Flue](https://flueframework.com/docs/guide/why-flue/), which grew from the Astro team's work at Cloudflare, provides the agent framework beneath that workflow. It covers a similar orchestration concern to Warp Factory; its [source code](https://github.com/withastro/flue) is public.

## A second case: Vercel's AI SDK

Vercel reports that, after just over four weeks of running its AI SDK factory, agents authored **25–35% of pull requests merged to main each week** and accounted for **70–80% of issue closures**. Its detailed results say that the factory closed more than 75% of issues closed in July. These are **Vercel's own figures for one project**: the percentages refer to merged PRs and closed issues, not every incoming PR or open issue. Vercel says people still review and merge the changes. [Vercel's AI SDK report](https://vercel.com/blog/building-a-software-factory-for-ai-sdk)

The useful comparison with Astro is the review boundary. Both systems can prepare evidence and proposed changes, while a person remains responsible for what enters the product.

## My experience: designing the work instead of every file

In an AI data infrastructure project, my role has changed. I used to write most of the code myself, then used AI as a helper while I still directed each file. Now I spend more time defining the problem, writing the specification, setting rules, and deciding whether the result is right. I spend less time guiding each edit.

I shape the overall plan with Opus 5.5. Sonnet 5.5 helps turn it into bounded task packages, sends them to Codex, and reviews the results. Codex implements each package and revisits failed checks. Skills and subagents help carry the work between these steps; I make the decisions when the specification is unclear. The diagram below shows the plan and build loop I use.

[![My project workflow: I define the plan, Codex builds each task package, and a reviewer checks the result before the next package](https://sysp0.com/blog/images/software-factory/software-factory-personal-workflow.96f63ffc.webp)](https://sysp0.com/blog/images/software-factory/software-factory-personal-workflow.96f63ffc.webp)

*The plan, checks, review, and correction loop for one task package. [Open the diagram at full size](https://sysp0.com/blog/images/software-factory/software-factory-personal-workflow.96f63ffc.webp) to read its details.*

I do not call this a complete software factory. Work still starts in our chat rather than a label-driven flow like Astro's, and I have not automated the entire path to release. By my own estimate, this change has improved my development speed by **at least 40%** in this project. That is a personal estimate, not a controlled benchmark. The biggest gain for me is having more attention for the specification and the decisions that shape the code.

## Infrastructure, measurement, and feedback

A visible workflow depends on context, compute, model access, orchestration, measurement, and permissions. Warp groups these with versioned definitions into seven infrastructure layers. Keeping prompts, skills, and permissions in versioned files lets a team review a configuration change and roll it back. [Warp's overview](https://www.warp.dev/articles/what-is-a-software-factory) · [Factories as Code](https://www.warp.dev/factories/configuration)

![An engineering workbench with versioned definitions, execution infrastructure, and monitoring instruments beneath the visible task](https://sysp0.com/blog/images/software-factory/software-factory-infrastructure-1200.9e4b9846.webp)

*The work on the surface depends on systems that define, execute, and observe it.*

Counting runs shows activity. It does not show whether the changes were correct or worth their cost. A scorer checks one run; a benchmark compares configurations across the same tasks. Warp describes replaying real engineering work for that comparison. Repeated failures can then motivate a reviewable change to a prompt, skill, or configuration, followed by another measurement. [Warp benchmarks](https://www.warp.dev/factories/benchmarks) · [Warp's improvement loop](https://docs.warp.dev/factories/measure-and-improve/self-improvement/)

![Two runs are compared using the same measures before a person reviews a proposed configuration change](https://sysp0.com/blog/images/software-factory/software-factory-measurement-1200.38808397.webp)

*Compare outcomes, review an adjustment, then measure again.*

## Risks, cost, and when to keep it simple

A public issue body, comment, link, or reproduction repository is **untrusted input**. It may contain instructions intended to redirect an agent (prompt injection) or code intended to reach credentials. Vercel describes running agents in isolated sandboxes with scoped secrets and restricted network access, while reserving merge decisions for people. Keep publishing credentials outside the environment that executes untrusted repository code. [Vercel's security discussion](https://vercel.com/blog/building-a-software-factory-for-ai-sdk) · [Vercel's factory guide](https://vercel.com/docs/agent-resources/software-factory)

Every run also consumes model tokens, compute, and reviewer time. A useful pilot sets a run budget and checks whether the team can review the output it creates. There is no universal per-issue saving to assume. [Vercel's workload guide](https://vercel.com/i/first-software-factory-tasks)

A factory fits repetitive work with a clear endpoint and checkable evidence. For exploratory work or an undecided product behavior, clarification comes first. Vercel warns that automating implementation too early can produce a change that passes tests while solving the wrong problem. A short checklist or one attended agent run may be enough when issues are few and irregular. [Vercel's factory guide](https://vercel.com/docs/agent-resources/software-factory)

## A concrete first workflow

Consider triage for bug reports in one repository. A new issue triggers a run. An agent checks whether the report has reproduction steps, then attempts reproduction in an isolated runner and posts the result with logs. A maintainer decides whether to request details, close the report with an explanation, or approve further investigation. Only a verified candidate fix becomes a reviewed pull request.

Track time to first useful response, incorrect triage decisions, model and compute cost per issue, and minutes spent reviewing. Compare those measures with the team's manual process before expanding the workflow.

## Further reading

- [Cloudflare's Astro triage case study](https://blog.cloudflare.com/astro-issue-triage/)
- [Astro triagebot-action and its state diagram](https://github.com/withastro/triagebot-action)
- [Why Flue?](https://flueframework.com/docs/guide/why-flue/) · [Flue source](https://github.com/withastro/flue)
- [Vercel's AI SDK factory results](https://vercel.com/blog/building-a-software-factory-for-ai-sdk)
- [Vercel's guide to software factories](https://vercel.com/docs/agent-resources/software-factory)
- [Warp's software-factory overview](https://www.warp.dev/articles/what-is-a-software-factory)
- [Matt Pocock's skills repository](https://github.com/mattpocock/skills)
