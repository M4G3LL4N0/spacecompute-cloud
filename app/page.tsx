import Link from "next/link";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";
import { CinematicHero } from "@/components/CinematicHero";
import { CONSOLE_METRICS, DEFAULT_ORBITAL_PLANNER_INPUT, FAQ_ITEMS, PRICING_TIERS, WORKLOAD_TYPES } from "@/src/lib/spacecompute-data";
import { generateOrbitalPlan } from "@/src/lib/spacecompute-engine";

const bottleneckCards = [
  {
    title: "Sensors outpace the link",
    body: "Satellites collect more data than they can send—raw archive stacks while operators wait on passes.",
  },
  {
    title: "Latency erodes mission value",
    body: "Ground eyes see minutes late. Wildfires, vessels, and debris need decisions while the beam is still warm.",
  },
  {
    title: "Ground processing is too slow",
    body: "Terrestrial queues are great for training—not for the seconds-class loop your payload actually needs.",
  },
  {
    title: "Bandwidth is expensive",
    body: "Every extra gigabyte is fuel, power, and spectrum you cannot buy back after launch.",
  },
  {
    title: "Operators need onboard prioritization",
    body: "Deploy inference to the satellite, send back only the frames that matter.",
  },
];

const howSteps = [
  { title: "Define workload", desc: "Bus class, sensors, models, and link budget in one orbital profile." },
  { title: "Deploy model", desc: "Signed bundles, canary windows, and mirrored ground twins for parity." },
  { title: "Process in orbit", desc: "Edge runtimes execute on sunlit capture, eclipse batch, or hybrid cadence." },
  { title: "Prioritize data", desc: "Policy router ranks anomalies, cues, and calibration ladders automatically." },
  { title: "Downlink what matters", desc: "Savings meter tracks egress vs raw—finance and ops read the same graph." },
];

export default function Home() {
  const preview = generateOrbitalPlan(DEFAULT_ORBITAL_PLANNER_INPUT);

  return (
    <div className="min-h-screen bg-[#050814] px-4 text-white sm:px-6 lg:px-8">
    <div className="pb-24">
      <CinematicHero />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" data-reveal>
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-purple-200/80">The downlink bottleneck</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Not every byte should come back to Earth.</h2>
          <p className="mt-3 text-slate-400">
            SpaceCompute Cloud helps satellites decide, process, compress, and act in orbit—before spectrum becomes the bottleneck.
          </p>
        </div>
        <div data-stagger className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {bottleneckCards.map((c) => (
            <div
              key={c.title}
              className="motion-card motion-hover-lift rounded-2xl border border-slate-800/90 bg-slate-950/50 p-5 transition hover:border-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <h3 className="text-sm font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-slate-950/40 py-20" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div data-stagger className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-200/80">Product preview</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Planner, savings, schedule, nodes—one surface.</h2>
              <p className="mt-3 max-w-xl text-slate-400">
                Default mission profile ({preview.rawDataVolumeTBPerDay} TB/day adjacent load) already shows{" "}
                <span className="text-cyan-300">{preview.downlinkReductionPct}%</span> modeled downlink reduction from the planner engine — not a live constellation.
              </p>
            </div>
            <Link href="/demo" className="w-fit rounded-full border border-cyan-400/40 px-5 py-2.5 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/10">
              Open interactive planner →
            </Link>
          </div>
          <div data-stagger className="mt-10 grid gap-4 lg:grid-cols-4">
            <div className="motion-card motion-hover-lift rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-950 to-cyan-950/30 p-5 lg:col-span-2">
              <p className="text-xs uppercase tracking-wide text-cyan-200/80">Downlink savings</p>
              <p className="mt-3 text-4xl font-semibold text-white">{preview.downlinkReductionPct}%</p>
              <p className="mt-2 text-sm text-slate-400">
                ~{preview.edgeFilteringSavingsTBPerDay.toFixed(1)} TB/day filtered at the edge vs raw ingest.
              </p>
            </div>
            <div className="motion-card motion-hover-lift rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">Modeled latency</p>
              <p className="mt-3 text-3xl font-semibold text-white">{CONSOLE_METRICS.averageLatencyMs} ms</p>
              <p className="text-sm text-slate-500">planner snapshot, not live telemetry</p>
            </div>
            <div className="motion-card motion-hover-lift rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">Orbital nodes</p>
              <p className="mt-3 text-3xl font-semibold text-white">{CONSOLE_METRICS.activeNodes}</p>
              <p className="text-sm text-slate-500">active in this console snapshot</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" data-reveal>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">How it works</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">From workload definition to prioritized downlink.</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {howSteps.map((s, i) => (
            <li key={s.title} className="motion-card motion-hover-lift relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="font-mono text-xs text-purple-300">0{i + 1}</span>
              <p className="mt-2 text-sm font-semibold text-white">{s.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-white/5 bg-gradient-to-b from-slate-950/80 to-transparent py-20" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-cyan-200/70">Workload types</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Built for missions that cannot wait for Earth.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WORKLOAD_TYPES.map((w) => (
              <div key={w.title} className="motion-card motion-hover-lift rounded-2xl border border-slate-800/90 bg-slate-900/40 p-5">
                <h3 className="text-sm font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" data-reveal>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Dashboard preview</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Orbital compute console at a glance.</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Figures below are the modeled console snapshot shipped with the demo, not billed usage or a live fleet.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Downlink reduction", `${CONSOLE_METRICS.downlinkReductionPct}%`],
            ["Daily data filtered", `${CONSOLE_METRICS.dailyDataFilteredTB} TB`],
            ["Inference jobs", CONSOLE_METRICS.inferenceJobs.toLocaleString()],
            ["Avg onboard latency", `${CONSOLE_METRICS.averageLatencyMs} ms`],
            ["Active nodes", String(CONSOLE_METRICS.activeNodes)],
            ["Cost avoided", `$${(CONSOLE_METRICS.costAvoidedUSD / 1000).toFixed(0)}k/mo`],
          ].map(([k, v]) => (
            <div key={k} className="motion-card motion-hover-lift rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500">{k}</p>
              <p className="mt-2 text-xl font-semibold text-white">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/dashboard" className="text-sm font-semibold text-cyan-300 hover:underline">
            Enter console →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6" data-reveal>
        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-950/20 p-8 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-wider text-indigo-200/80">Why now</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">More satellites. More models. Less patience for slow links.</h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Cheaper edge compute on orbit, denser constellations, and AI-native payloads mean the winning missions process where
            the photons land—not where the fiber starts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6" data-reveal>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Pricing</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Usage-based orbital compute.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <div key={tier.name} className="motion-card motion-hover-lift flex flex-col rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
              <p className="mt-3 text-2xl font-bold text-cyan-300">{tier.price}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{tier.unit}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-300">
                {tier.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <Link href="/contact" className="mt-6 text-sm font-semibold text-purple-200 hover:underline">
                Talk to mission integration →
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link href="/pricing" className="text-cyan-300 hover:underline">
            Full pricing page
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6" data-reveal>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Answers for flight software and cloud teams.</h2>
        <dl className="mt-8 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q} className="motion-card motion-hover-lift rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <dt className="text-sm font-semibold text-white">{item.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-400">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6" data-reveal>
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-slate-950 to-purple-600/15 p-10 text-center">
          <h2 className="text-2xl font-semibold text-white">Ready to plan your orbital edge layer?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            Simulate workloads, see downlink savings, and mirror deployments to your mission console—no paid APIs, no mock
            hyperscaler chrome.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/demo" className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950">
              Plan an orbital workload
            </Link>
            <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/5">
              Talk to mission integration
            </Link>
          </div>
        </div>
      </section>
    </div>

      <ProductHonestyNote status="demo" />
    </div>
  );
}
