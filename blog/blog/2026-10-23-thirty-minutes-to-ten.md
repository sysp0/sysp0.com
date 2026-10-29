---
slug: 2026-10-23-thirty-minutes-to-ten
title: "30 minutes to 10: running tests in parallel"
date: 2026-10-23
category: infrastructure
image: https://sysp0.com/blog/images/parallel-1200.webp
tags: [DevOps, Jenkins]
description: How parallel pipelines cut a typical network test run from about 30 minutes to about 10.
---

Our QC team tested network products on real hardware. For a long time those tests ran one after another, and a typical run took about 30 minutes.

<!-- truncate -->

## The change

I moved the tests into parallel Jenkins pipelines so they run at the same time. A typical run dropped to about 10 minutes.

## Why it wasn't just "turn on parallel"

The tests ran on physical devices, and the pool of devices was limited. You can't spin up more of them the way you can with containers. So the parallelism had to work within what actually existed, which made it a scheduling problem as much as a pipeline one.

## What came with it

Test artifacts were stored in MinIO, collected by Celery jobs and written to a database. The QC test platform, ZAts, went from manual runs to automated pipelines with results stored and tracked.

## What I took from it

A test run that takes ten minutes gets run more often than one that takes thirty. Speed was not only a convenience. It changed how often the team checked its work.
