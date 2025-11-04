"use client";

import { useMemo, useState } from "react";
import { players } from "@/data/players";
import { PlayerCard } from "@/components/player-card";
import { FilterPanel } from "@/components/filters";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const heroLines = [
  "VALORANT ELITE",
  "CS:GO TITANS",
  "CROSS-DISCIPLINE DYNASTY"
];

type ViewMode = "grid" | "list";

function filterPlayers(
  query: string,
  valorantTeam: string,
  csTeam: string
) {
  const normalizedQuery = query.trim().toLowerCase();

  return players.filter((player) => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      [
        player.handle,
        player.realName,
        player.playstyle,
        player.nationality,
        ...player.notableMoments,
        ...player.valorantTeams.flatMap((team) => [team.name, ...team.accolades]),
        ...player.counterStrikeTeams.flatMap((team) => [team.name, ...team.accolades])
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesValorant =
      valorantTeam === "All Teams" ||
      player.valorantTeams.some((team) => team.name === valorantTeam);

    const matchesCS =
      csTeam === "All Teams" ||
      player.counterStrikeTeams.some((team) => team.name === csTeam);

    return matchesSearch && matchesValorant && matchesCS;
  });
}

export default function Page() {
  const [search, setSearch] = useState("");
  const [valorantTeam, setValorantTeam] = useState("All Teams");
  const [csTeam, setCSTeam] = useState("All Teams");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const valorantOptions = useMemo(
    () => Array.from(new Set(players.flatMap((player) => player.valorantTeams.map((team) => team.name)))).sort(),
    []
  );

  const csOptions = useMemo(
    () => Array.from(new Set(players.flatMap((player) => player.counterStrikeTeams.map((team) => team.name)))).sort(),
    []
  );

  const filteredPlayers = useMemo(
    () => filterPlayers(search, valorantTeam, csTeam),
    [search, valorantTeam, csTeam]
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-12 lg:px-12">
      <section className="grid gap-8 lg:grid-cols-[340px,1fr] lg:items-start">
        <FilterPanel
          search={search}
          onSearch={setSearch}
          selectedValorant={valorantTeam}
          onSelectValorant={setValorantTeam}
          selectedCS={csTeam}
          onSelectCS={setCSTeam}
          valorantOptions={valorantOptions}
          csOptions={csOptions}
        />

        <div className="space-y-8">
          <header className="space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-valorant-gray/60 via-valorant-dark to-black p-8 backdrop-blur">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Dual Threat Archives</p>
              <h1 className="font-display text-5xl font-semibold text-white drop-shadow lg:text-6xl">
                Crossfire Royalty
              </h1>
              <p className="text-base text-white/70 lg:text-lg">
                A curated index of duelists, tacticians, and clutch gods who conquered VCT brackets after honing their craft in Tier 1 Counter-Strike. Drill into their timelines and compare the traits that translate across esports eras.
              </p>
            </div>
            <ul className="grid gap-2 text-sm text-white/60 md:grid-cols-3">
              {heroLines.map((line) => (
                <li key={line} className="rounded-2xl border border-white/5 bg-white/5 px-3 py-2 text-center font-display tracking-[0.3em]">
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="uppercase tracking-[0.3em] text-white/40">View Mode</span>
              <div className="flex gap-2">
                {(["grid", "list"] as ViewMode[]).map((mode) => {
                  const isActive = viewMode === mode;
                  return (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setViewMode(mode)}
                      className={clsx(
                        "rounded-full border px-3 py-1 uppercase tracking-[0.25em] transition",
                        isActive
                          ? "border-valorant-red bg-valorant-red/20 text-valorant-red"
                          : "border-white/10 text-white/70 hover:border-white/30"
                      )}
                    >
                      {mode}
                    </button>
                  );
                })}
              </div>
              <span className="ml-auto text-white/60">
                Showing {filteredPlayers.length} {filteredPlayers.length === 1 ? "player" : "players"}
              </span>
            </div>
          </header>

          <AnimatePresence mode="popLayout">
            {filteredPlayers.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center text-white/60"
              >
                <p>No players match your filters. Try broadening the search.</p>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                key="grid"
                layout
                className="grid gap-6 md:grid-cols-2"
              >
                {filteredPlayers.map((player) => (
                  <PlayerCard key={player.handle} player={player} />
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" layout className="space-y-6">
                {filteredPlayers.map((player) => (
                  <PlayerCard key={player.handle} player={player} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
