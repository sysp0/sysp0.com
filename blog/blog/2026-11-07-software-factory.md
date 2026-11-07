---
slug: software-factory
title: "What Is a Software Factory? From Coding Agent to Measurable Workflow"
date: 2026-11-07
authors: reza
category: ai
image: https://sysp0.com/blog/images/software-factory-loop-1200.webp
tags: [AI, Software Engineering, Agents]
description: "A practical explanation of software factories: how agents, runners, review, and feedback fit together, using Astro's bug triage as a real example."
---

A coding agent can fix a bug. That does not tell a team how the bug arrived, whether it was real, what evidence supports the fix, or who approved it. A **software factory** connects those decisions into a repeatable process.

Cloudflare offers a useful example. Its automated triage system for the Astro repository reproduced incoming bug reports, investigated their causes, and produced preview releases for reporters to verify. Cloudflare reported that open issues fell from more than 200 to about 30 after months of iteration. That is a result from one project, not a promise that every team can achieve the same numbers. [Cloudflare's account of the Astro workflow](https://blog.cloudflare.com/astro-issue-triage/)

<!-- truncate -->

## A factory is the workflow around the agent

A coding agent works on a task in an environment with tools and access. The factory defines what happens before and after that task: where work enters, which agent handles each step, what evidence it must leave behind, and when a person makes the next decision.

Warp describes a loop spanning triage, specification, implementation, review, verification, shipping, and monitoring. Agents do repeatable work; humans remain at decision points. The useful distinction is the **closed loop**: a run is recorded, its result is checked, and what the team learns can change the next run. [Warp's definition of a software factory](https://www.warp.dev/articles/what-is-a-software-factory)

A prompt can direct one step. It cannot, by itself, give the team a dependable way to route work, recover from failure, review changes, or compare outcomes.

## From one agent to a repeatable system

The diagram shows how a single coding agent can become part of a larger, triggered workflow. It is a conceptual map, not a required architecture.

![Conceptual funnel from a coding agent through cloud automation to a measurable software factory](/blog/images/software-factory-funnel.webp)

*The factory adds orchestration, measurement, and a feedback loop around individual agent runs.*

Four terms make the workflow easier to discuss:

- **Task:** a kind of work defined once and performed many times, such as investigating a bug report.
- **Trigger:** an event that starts a new execution, such as a new ticket or a person's reply.
- **Run:** one execution of a task. It finishes; a later human reply can trigger another run.
- **Runner:** the environment in which that execution takes place.

The **ticket tracker** holds work and conversation, the **git host** holds branches and pull requests, and the **orchestrator** starts and tracks runs. Logs and traces let people inspect what happened. This vocabulary follows [Matt Pocock's software-factory skill](https://raw.githubusercontent.com/mattpocock/skills/main/skills/in-progress/software-factory/SKILL.md).

## What happens to a bug report in Astro?

Cloudflare started with a narrow, expensive job: issue triage. Maintainers first tested an agent skill locally, then ran the same workflow in GitHub Actions. Its four steps mirror a careful human investigation: [Cloudflare's technical walkthrough](https://blog.cloudflare.com/astro-issue-triage/)

1. **Reproduce** the reported behavior from the supplied repository.
2. **Diagnose** its likely cause by inspecting and instrumenting the code.
3. **Verify** whether the behavior is a bug or intended, using tests and documentation.
4. **Fix** it, beginning with a test that fails before the change.

Separate agents handle the stages and pass a report forward. GitHub issue labels track progress. When the system finds a fix, it posts its findings and a preview release back to the issue. The reporter can try the patch; a confirmed fix leads to a linked pull request. Human feedback is part of the process rather than an afterthought.

![A bug report passes through investigation and testing before a person approves the result and feedback starts another cycle](/blog/images/software-factory-bug-review-1200.webp)

*A visible path from report to evidence to human review makes the automation easier to trust.*

## The infrastructure beneath the visible flow

The Astro example shows a workflow, but that workflow needs somewhere to get its context, run code, and preserve evidence. Warp groups a factory's infrastructure into seven layers: definition as code, context, compute, models and harnesses, measurement, orchestration, and access. This is Warp's framework, not a checklist every team must implement in full. [Warp's seven-layer explanation](https://www.warp.dev/articles/what-is-a-software-factory)

The definition-as-code layer is especially practical. If prompts, skills, permissions, and automations live in versioned files, a team can review a change, roll it back, and compare the results of two configurations. [Warp's factory configuration guide](https://www.warp.dev/factories/configuration)

![An engineering workbench with versioned definitions, execution infrastructure, and monitoring instruments beneath the visible task](/blog/images/software-factory-infrastructure-1200.webp)

*The work on the surface depends on the systems that define, execute, and observe it.*

## Measure quality before expanding the loop

Counting runs tells you how busy a factory is. It does not tell you whether the changes are correct or worth their cost.

A **scorer** evaluates a run against criteria such as correctness, quality, or cost. A **benchmark** compares models, harnesses, or configurations across the same set of tasks. Warp describes replaying real engineering work to make those comparisons, rather than choosing a configuration by intuition alone. [Warp's benchmarks](https://www.warp.dev/factories/benchmarks)

Measurements become useful when they lead to a reviewable change. For a factory defined in code, Warp's self-improvement flow can group repeated failures and open a pull request that changes a prompt, skill, or configuration. A person reviews that proposal before it is adopted. Future runs then show whether it helped. [Warp's self-improvement documentation](https://docs.warp.dev/factories/measure-and-improve/self-improvement/)

![Two runs are compared using the same measures before a person reviews a proposed configuration change](/blog/images/software-factory-measurement-1200.webp)

*Compare outcomes, review the proposed adjustment, then measure again.*

## Keep the human decision visible

Automation can prepare a change without owning every decision about it. In the Astro workflow, the reporter verifies a preview before the pull request is opened. Gumloop describes a similar boundary: agents collect evidence, including tests that fail before a fix and pass afterward, while engineers review and merge the resulting pull requests. [Gumloop's software-factory account](https://www.gumloop.com/engineering/software-factory)

That boundary matters because a passing test is only one kind of evidence. Someone still needs to judge whether a change fits the product, architecture, and risk the team is willing to accept.

## Where should a team start?

Choose one repetitive task with a clear input, a checkable output, and a person who can review the result. Write down the trigger, the evidence each stage must produce, and the decision that ends a run. Try that narrow flow before adding more tasks or agents.

The useful question is not “How many agents can we run?” It is “Can we trace a piece of work from its trigger through verification and a human decision, then use what we learned next time?”

## Further reading

- [What Is a Software Factory? — Warp](https://www.warp.dev/articles/what-is-a-software-factory)
- [How We Built a Software Factory for Astro — Cloudflare](https://blog.cloudflare.com/astro-issue-triage/)
- [Factories as Code — Warp](https://www.warp.dev/factories/configuration)
- [Benchmarks — Warp](https://www.warp.dev/factories/benchmarks)
- [Self-improvement — Warp Docs](https://docs.warp.dev/factories/measure-and-improve/self-improvement/)
- [Software Factory — Gumloop Engineering](https://www.gumloop.com/engineering/software-factory)
- [Software-factory skill — Matt Pocock](https://raw.githubusercontent.com/mattpocock/skills/main/skills/in-progress/software-factory/SKILL.md)
