# Copy Rewrite — index.html Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Hero, About (typed text), and Mindset sections in index.html to better reflect DevOps/SRE/Cloud identity with quiet confidence tone.

**Architecture:** Direct edits to `index.html` only. Static HTML site — no build step, no tests. Each task is a self-contained set of edits followed by a commit.

**Tech Stack:** Plain HTML, no framework.

---

### Task 1: Hero section

**Files:**
- Modify: `index.html:102-103`

- [ ] **Step 1: Update h1**

In `index.html`, find:
```html
<h1 class="heading font-36 text-white mt-4">Hi there, I'm Javier.</h1>
```
Replace with:
```html
<h1 class="heading font-36 text-white mt-4">Javier González.</h1>
```

- [ ] **Step 2: Update h3 tagline**

Find:
```html
<h3 class="designation mb-3 text-white">Platform engineer with a decade building reliable, scalable infrastructure for fast-moving teams — from bare metal to Kubernetes, from on-call to GitOps.</h3>
```
Replace with:
```html
<h3 class="designation mb-3 text-white">A decade making sure the infrastructure is never the reason a team can't ship.</h3>
```

- [ ] **Step 3: Verify visually**

Open `index.html` in browser. Hero should show `Javier González.` as heading and the new tagline below.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(copy): rewrite hero heading and tagline"
```

---

### Task 2: About — remove Platform Engineer from typed text

**Files:**
- Modify: `index.html:134`

- [ ] **Step 1: Update data-elements attribute**

Find:
```html
<h4 class="heading mr-2">I Am a <span class="element text-primary" data-elements="DevOps Engineer, Site Reliability Engineer, Platform Engineer, Cloud Engineer"></span></h4>
```
Replace with:
```html
<h4 class="heading mr-2">I Am a <span class="element text-primary" data-elements="DevOps Engineer, Site Reliability Engineer, Cloud Engineer"></span></h4>
```

- [ ] **Step 2: Verify visually**

Open `index.html` in browser. Scroll to About section. Confirm the typed animation cycles through only: DevOps Engineer → Site Reliability Engineer → Cloud Engineer.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(copy): remove Platform Engineer from typed roles"
```

---

### Task 3: Mindset — Card 1

**Files:**
- Modify: `index.html` (first card in Mindset section, ~line 165–175)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Automate to eliminate toil</h3>
<p class="text-light-muted mb-4">Manual, repetitive work is a reliability risk and a morale drain. Every process that can be codified — provisioning, testing, deployments, remediation — should be. Automation scales your capacity without scaling headcount and shifts engineers from reactive firefighting to building systems that stay healthy on their own.</p>
```
Replace with:
```html
<h3 class="title mb-3">Toil is a bug, not a feature</h3>
<p class="text-light-muted mb-4">Manual, repetitive work compounds quietly until it owns your week. Every process that can be codified should be — provisioning, testing, deployment, remediation. The goal of automation isn't efficiency. It's preserving engineering judgment for problems that actually require it.</p>
```

---

### Task 4: Mindset — Card 2

**Files:**
- Modify: `index.html` (~line 183–188)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Ship small, ship often</h3>
<p class="text-light-muted mb-4">Deployment frequency is a leading indicator of team health. Small, frequent releases reduce blast radius, accelerate feedback loops, and make rollbacks trivial. A mature CI/CD pipeline is not a tooling choice — it's an organizational one, enabling teams to own the full lifecycle of what they build.</p>
```
Replace with:
```html
<h3 class="title mb-3">Deployment frequency is a health metric</h3>
<p class="text-light-muted mb-4">How often a team deploys tells you more about its culture than any post-mortem. Small, frequent releases compress feedback loops, reduce blast radius, and make rollbacks trivial. CI/CD isn't a tooling choice — it's a signal that a team owns what it ships end to end.</p>
```

---

### Task 5: Mindset — Card 3

**Files:**
- Modify: `index.html` (~line 195–200)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Declare state, eliminate drift</h3>
<p class="text-light-muted mb-4">Infrastructure defined as code is infrastructure you can review, reproduce, and audit. Version control becomes your change log, pull requests become your approval process, and every environment is disposable by design. GitOps takes this further — the desired state lives in Git, and the system converges to it automatically.</p>
```
Replace with:
```html
<h3 class="title mb-3">The desired state lives in Git</h3>
<p class="text-light-muted mb-4">Infrastructure defined as code is infrastructure you can review, reproduce, and audit. GitOps extends this further: the system converges to what's in the repository, not to what someone ran last Tuesday. Version control becomes the change log; pull requests become the approval process.</p>
```

---

### Task 6: Mindset — Card 4

**Files:**
- Modify: `index.html` (~line 210–215)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Platform thinking over siloed ops</h3>
<p class="text-light-muted mb-4">The role of a platform team is to build internal systems that empower product engineers to self-serve — not to be the bottleneck between developers and production. A good platform treats developers as customers, reduces cognitive load, and embeds reliability practices into the path of least resistance.</p>
```
Replace with:
```html
<h3 class="title mb-3">You build it, you run it</h3>
<p class="text-light-muted mb-4">The handoff between development and operations is where accountability goes to die. When the team that ships is also the team on-call, the incentives align. DevOps isn't a set of tools — it's the decision to own the full lifecycle of what you build.</p>
```

---

### Task 7: Mindset — Card 5

**Files:**
- Modify: `index.html` (~line 223–228)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Error budgets, not blame</h3>
<p class="text-light-muted mb-4">Failure is not exceptional — it is a property of distributed systems at scale. SRE practice formalizes this with error budgets: an explicit contract between reliability and velocity. Blameless postmortems shift the focus from who to what, turning incidents into a compounding knowledge base that makes the next failure cheaper.</p>
```
Replace with:
```html
<h3 class="title mb-3">Failure is data, not shame</h3>
<p class="text-light-muted mb-4">Distributed systems fail. The question is what you learn. Error budgets make the reliability contract explicit — a formal agreement between velocity and stability. Blameless postmortems turn incidents into institutional memory. Every failure should make the next one cheaper.</p>
```

---

### Task 8: Mindset — Card 6

**Files:**
- Modify: `index.html` (~line 235–240)

- [ ] **Step 1: Update title and body**

Find:
```html
<h3 class="title mb-3">Observability over monitoring</h3>
<p class="text-light-muted mb-4">Traditional monitoring tells you something is broken. Observability tells you why. SLIs and SLOs turn vague uptime goals into measurable commitments. DORA metrics quantify delivery performance. Without data, improvement is just opinion.</p>
```
Replace with:
```html
<h3 class="title mb-3">You can't improve what you don't observe</h3>
<p class="text-light-muted mb-4">Monitoring tells you something is broken. Observability tells you why. SLIs and SLOs aren't dashboard metrics — they're commitments. DORA metrics measure whether delivery is actually improving over time. Without data, improvement is just opinion.</p>
```

---

### Task 9: Final verification and commit

- [ ] **Step 1: Open index.html in browser and verify all sections**

Check:
- Hero: heading is `Javier González.`, tagline is the new one
- About: typed text cycles DevOps Engineer → Site Reliability Engineer → Cloud Engineer (no Platform Engineer)
- Mindset: all 6 cards show new titles and paragraphs
- Resume: unchanged
- Contact: unchanged

- [ ] **Step 2: Commit all Mindset changes together**

```bash
git add index.html
git commit -m "feat(copy): rewrite mindset section — DevOps/SRE/Cloud focus"
```
