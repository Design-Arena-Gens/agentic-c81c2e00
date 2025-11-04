"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Player } from "@/data/players";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/40"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-valorant-red/80 via-white/70 to-valorant-red/80" />
      <div className="space-y-6 p-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.2em] text-white/60">Handle</span>
            <span className="text-xs text-white/40">{player.nationality}</span>
          </div>
          <h2 className="text-3xl font-display font-semibold text-valorant-red drop-shadow">{player.handle}</h2>
          <p className="text-white/80">{player.realName}</p>
        </header>

        <section className="grid gap-4 text-sm lg:grid-cols-2">
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-white/60">Valorant Resume</h3>
            <ul className="mt-2 space-y-2">
              {player.valorantTeams.map((team) => (
                <li key={`${player.handle}-${team.name}`} className="rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                  <p className="text-white font-medium">{team.name}</p>
                  <p className="text-xs text-white/60">{team.years}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-[0.74rem] text-white/70">
                    {team.accolades.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.3em] text-white/60">Counter-Strike Pedigree</h3>
            <ul className="mt-2 space-y-2">
              {player.counterStrikeTeams.map((team) => (
                <li key={`${player.handle}-${team.name}`} className="rounded-xl border border-white/5 bg-white/5 px-3 py-2">
                  <p className="text-white font-medium">{team.name}</p>
                  <p className="text-xs text-white/60">{team.years}</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-[0.74rem] text-white/70">
                    {team.accolades.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-white/60">Playstyle Snapshot</h3>
          <p className="mt-2 text-sm leading-6 text-white/80">{player.playstyle}</p>
        </section>

        <section>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-white/60">Notable Moments</h3>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            {player.notableMoments.map((moment) => (
              <li key={moment} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-valorant-red" />
                <span>{moment}</span>
              </li>
            ))}
          </ul>
        </section>

        <footer className="flex flex-wrap items-center gap-3 text-xs text-white/60">
          {Object.entries(player.socials)
            .filter(([, url]) => Boolean(url))
            .map(([platform, url]) => (
              <Link
                key={platform}
                href={url as string}
                target="_blank"
                className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em] text-white/80 transition hover:border-valorant-red/60 hover:text-valorant-red"
              >
                {platform}
              </Link>
            ))}
        </footer>
      </div>
    </motion.article>
  );
}
