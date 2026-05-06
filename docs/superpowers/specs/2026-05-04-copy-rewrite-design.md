# Copy Rewrite — index.html

**Date:** 2026-05-04
**Scope:** Hero, About (partial), Mindset
**Approach:** Axiom-driven (A) + dual-register context in descriptions (C)
**Tone:** Quiet confidence — dense, precise, no hype, no adjective inflation

---

## Decisions

- **Audience:** Mixed — recruiters, CTOs/founders, technical peers
- **Tone:** Quiet and confident. Expertise without selling.
- **Message to retain:** Deep technical expertise at the service of team velocity and autonomy
- **Roles to reflect:** DevOps Engineer, Site Reliability Engineer, Cloud Engineer — no "Platform Engineer"

---

## Changes

### Hero

| | Text |
|---|---|
| **h1 (current)** | `Hi there, I'm Javier.` |
| **h1 (new)** | `Javier González.` |
| **h3 (current)** | `Platform engineer with a decade building reliable, scalable infrastructure for fast-moving teams — from bare metal to Kubernetes, from on-call to GitOps.` |
| **h3 (new)** | `A decade making sure the infrastructure is never the reason a team can't ship.` |

### About — typed text only

Remove `Platform Engineer` from the `data-elements` attribute.

| | Value |
|---|---|
| **Current** | `DevOps Engineer, Site Reliability Engineer, Platform Engineer, Cloud Engineer` |
| **New** | `DevOps Engineer, Site Reliability Engineer, Cloud Engineer` |

About paragraph: **no changes.**

### Mindset — 6 cards rewritten

#### Card 1
- **Title (current):** Automate to eliminate toil
- **Title (new):** Toil is a bug, not a feature
- **Body (new):** Manual, repetitive work compounds quietly until it owns your week. Every process that can be codified should be — provisioning, testing, deployment, remediation. The goal of automation isn't efficiency. It's preserving engineering judgment for problems that actually require it.

#### Card 2
- **Title (current):** Ship small, ship often
- **Title (new):** Deployment frequency is a health metric
- **Body (new):** How often a team deploys tells you more about its culture than any post-mortem. Small, frequent releases compress feedback loops, reduce blast radius, and make rollbacks trivial. CI/CD isn't a tooling choice — it's a signal that a team owns what it ships end to end.

#### Card 3
- **Title (current):** Declare state, eliminate drift
- **Title (new):** The desired state lives in Git
- **Body (new):** Infrastructure defined as code is infrastructure you can review, reproduce, and audit. GitOps extends this further: the system converges to what's in the repository, not to what someone ran last Tuesday. Version control becomes the change log; pull requests become the approval process.

#### Card 4
- **Title (current):** Platform thinking over siloed ops
- **Title (new):** You build it, you run it
- **Body (new):** The handoff between development and operations is where accountability goes to die. When the team that ships is also the team on-call, the incentives align. DevOps isn't a set of tools — it's the decision to own the full lifecycle of what you build.

#### Card 5
- **Title (current):** Error budgets, not blame
- **Title (new):** Failure is data, not shame
- **Body (new):** Distributed systems fail. The question is what you learn. Error budgets make the reliability contract explicit — a formal agreement between velocity and stability. Blameless postmortems turn incidents into institutional memory. Every failure should make the next one cheaper.

#### Card 6
- **Title (current):** Observability over monitoring
- **Title (new):** You can't improve what you don't observe
- **Body (new):** Monitoring tells you something is broken. Observability tells you why. SLIs and SLOs aren't dashboard metrics — they're commitments. DORA metrics measure whether delivery is actually improving over time. Without data, improvement is just opinion.

---

## Out of Scope

- Resume descriptions: no changes
- Contact section: no changes
- Visual design, layout, CSS: no changes
