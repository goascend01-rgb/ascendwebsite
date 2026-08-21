# Market positioning: how to get the US site back

**Written 2026-08-21, when the platform pivoted to Pakistan first.**

This repository has carried two market positionings. Both are complete, both
shipped, and neither is lost. This file is the map.

---

## 1. The short version

| | |
| --- | --- |
| **What is on `main` now** | Pakistan first. PKR pricing, WhatsApp led, salary anchored, no HIPAA gate. |
| **Where the US version is** | Branch `us-positioning`, and tag `us-positioning-v1`, both at commit `238aec0`. |
| **Is it safe?** | Yes. Pushed to `goascend01-rgb/ascendwebsite`. A tag cannot move; a branch would have to be deleted deliberately. |
| **How long to switch back** | Minutes, if nothing else changed. See §4. |

To look at the US site right now without disturbing anything:

```bash
git fetch goascend
git switch --detach us-positioning-v1     # read only, changes nothing
git switch -                              # back to where you were
```

---

## 2. Why the pivot, in one paragraph

Founder decision, 2026-08-21. The US is the larger market and remains the
strategic target, but three things gate it: the LLC is applied for and not
issued, BAA coverage across the vendor stack is unresolved, and Stripe plus
US billing assumes an entity that does not exist yet. **Pakistan has none of
those gates**, and the one channel that matters there, WhatsApp, is already
built. So Pakistan is what the site can honestly sell today, and the US
version waits on a branch rather than on the homepage.

This is the same principle the whole site is built on, applied to the site
itself: sell what exists now, not what is expected.

---

## 3. What actually differs between the two

Everything structural is shared. The IA, Creative Studio, the Intelligence
Network, the Foundation layer, acquisition economics, the practice record,
the briefings, the guard tests and the whole design system are identical on
both branches. **Only the market layer differs**, and it is deliberately
small:

| Area | `us-positioning` | `main` (Pakistan) |
| --- | --- | --- |
| Currency | USD, `money()` in `src/lib/leak.ts` | PKR |
| Tiers | 697 / 1,997 / 4,997 per month | 24,000 / 65,000 / 150,000 |
| Install | 995 / 2,500 / 7,500 | 30,000 / 75,000 / 200,000 |
| Founding cohort | 10 practices, cohort two at $2,497 | 20 practices, PKR 35,000 locked |
| Price anchor | A stack of seven US SaaS products | **A receptionist's salary** |
| Billing | Annual prepay, two months free | Monthly. Stripe does not operate in Pakistan and billing is manual. |
| Channel order | Omnichannel, five channels equally | **WhatsApp first**, the rest after |
| Compliance | HIPAA, BAA, business associate | No HIPAA gate. Architecture claims unchanged, framing is not US law. |
| Proof regions | Texas, Arizona, Florida | Lahore, Karachi, Islamabad |
| Calculator default visit value | $280 | PKR 12,000 |
| Staffing business | US facing | **Unchanged, still US facing** |

### The staffing business does not move
Ascend Staffing places remote Pakistani professionals **into US practices**.
That is a US-facing business and it stays US-facing on both branches. Only the
platform pivoted. If a future session "makes the site Pakistani", it must not
drag `/staffing` along with it.

---

## 4. How to switch back to US

### If nothing has been built on top of Pakistan
```bash
git fetch goascend
git switch -c us-restore us-positioning
git push goascend us-restore:main          # fast-forward only if main has not moved
```
If `main` has moved, that push is rejected rather than destroying work, which
is the intended behaviour. Use the next recipe instead.

### If Pakistan work must be kept
The market layer is small and named. Take the US values from
`us-positioning` file by file:

```bash
git fetch goascend
git checkout us-positioning -- src/lib/site.ts src/lib/leak.ts
git checkout us-positioning -- src/components/home/CostComparison.tsx
git checkout us-positioning -- tests/leak-model.test.ts
git checkout us-positioning -- tests/placeholder-proof-is-unattributed.test.ts
npm test && npm run build
```

Then re-read §3 and reverse anything in the right-hand column that survived.
`grep -rn "PKR" src/` should return nothing when the switch is complete.

### If both markets need to run at once
That is a bigger change and it is not what this file describes. It would mean
lifting the right-hand column of §3 into a single `MARKET` constant and
branching the copy on it. Do not attempt it as a side effect of a content
edit: it touches pricing, and pricing that renders differently in two places
is pricing that will eventually disagree with itself.

---

## 5. What must stay true in either market

These are not market decisions and reversing the pivot must not disturb them:

- **Every claim matches the platform codebase.** See `CLAUDE.md` for the
  register, and the corrections table dated 2026-08-21 for the ones that were
  found wrong.
- **Network contribution is opt-out, and withdrawal decays rather than
  purging.** Verified in `network/collect.ts` and `network/standing.ts`.
- **No confidence tier on a deterministic recommendation.** The evidence rail
  takes a state, never a number.
- **Meta is a patient-data subprocessor.**
- **No long dash anywhere.** Guard test enforces it.
- **Internal product names stay off the site.**

---

## 6. Restore points

| Ref | Commit | What it is |
| --- | --- | --- |
| `us-positioning` | `238aec0` | Branch. The US site as it went live. |
| `us-positioning-v1` | `238aec0` | Annotated tag. Cannot move. Prefer this one. |

Both are pushed to `https://github.com/goascend01-rgb/ascendwebsite`.

If you ever cannot find them, every commit is also reachable by SHA:

```bash
git fetch goascend '+refs/*:refs/remotes/goascend/*'
git log --oneline 238aec0 -1
```
