"use client";

import { useState } from "react";
import { Chart } from "../components/Chart";
import { Listbox } from "../components/Listbox";

interface SquadsProps {
  squads: {
    name: string;
    id: string;
    scope: { colour: string; name: string; progress: number }[];
  }[];
}

export function Squads({ squads }: SquadsProps) {
  const [selectedSquad, setSelectedSquad] = useState(squads[0]);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div>
        <Listbox
          list={squads.map((squad) => ({ name: squad.name, value: squad.id }))}
          defaultSelected={{
            name: selectedSquad.name,
            value: selectedSquad.id,
          }}
          onSelected={(selected) => {
            let squad = null;
            squads.find((squad) => squad.id === selected?.value);
            if (selected) {
              squad = squads.find((squad) => squad.id === selected.value);
            }
            setSelectedSquad(squad || squads[0]);
          }}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <Chart scopes={selectedSquad.scope || []} />
      </div>
    </div>
  );
}
