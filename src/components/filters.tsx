"use client";

import { useMemo } from "react";

export type FilterOption = {
  label: string;
  value: string;
};

type FilterPanelProps = {
  search: string;
  onSearch: (value: string) => void;
  selectedValorant: string;
  onSelectValorant: (value: string) => void;
  selectedCS: string;
  onSelectCS: (value: string) => void;
  valorantOptions: string[];
  csOptions: string[];
};

export function FilterPanel({
  search,
  onSearch,
  selectedValorant,
  onSelectValorant,
  selectedCS,
  onSelectCS,
  valorantOptions,
  csOptions
}: FilterPanelProps) {
  const valorantItems = useMemo(() => ["All Teams", ...valorantOptions], [valorantOptions]);
  const csItems = useMemo(() => ["All Teams", ...csOptions], [csOptions]);

  return (
    <aside className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-lg shadow-black/40">
      <div>
        <label htmlFor="player-search" className="text-xs uppercase tracking-[0.3em] text-white/60">
          Search
        </label>
        <input
          id="player-search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search players, roles, accolades..."
          className="mt-2 w-full rounded-2xl border border-white/10 bg-valorant-gray/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-valorant-red focus:outline-none"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Valorant Teams</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {valorantItems.map((option) => {
            const isActive = option === selectedValorant;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelectValorant(option)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] transition ${
                  isActive ? "border-valorant-red bg-valorant-red/20 text-valorant-red" : "border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Counter-Strike Teams</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {csItems.map((option) => {
            const isActive = option === selectedCS;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelectCS(option)}
                className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] transition ${
                  isActive ? "border-valorant-red bg-valorant-red/20 text-valorant-red" : "border-white/10 text-white/70 hover:border-white/30"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
