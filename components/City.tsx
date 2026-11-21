"use client";

import { useCallback, useState } from "react";
import Loader from "./Loader";
import Hud from "./Hud";
import Hero from "./Hero";
import Trailer from "./Trailer";
import Protagonist from "./Protagonist";
import Missions from "./Missions";
import Districts from "./Districts";
import StoryMode from "./StoryMode";
import Newswire from "./Newswire";
import Crew from "./Crew";
import MissionModal from "./MissionModal";
import type { Project } from "@/lib/types";

export default function City() {
  const [ready, setReady] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const [brief, setBrief] = useState<{ list: Project[]; i: number } | null>(null);

  const onDone = useCallback(() => setReady(true), []);
  const open = useCallback((p: Project, list: Project[]) => {
    const i = Math.max(0, list.findIndex((x) => x.slug === p.slug));
    setBrief({ list, i });
  }, []);
  const step = useCallback((d: 1 | -1) => {
    setBrief((b) => (b ? { list: b.list, i: (b.i + d + b.list.length) % b.list.length } : b));
  }, []);
  const close = useCallback(() => setBrief(null), []);

  return (
    <>
      <Loader onDone={onDone} />
      <Hud visible={ready && !trailer && !brief} />
      <main>
        <Hero ready={ready} onTrailer={() => setTrailer(true)} />
        <Protagonist />
        <Missions onOpen={open} />
        <Districts onOpen={open} />
        <StoryMode />
        <Newswire onOpen={open} />
        <Crew />
      </main>
      <Trailer
        open={trailer}
        onClose={() => setTrailer(false)}
        onExplore={() => {
          setTrailer(false);
          setTimeout(() => document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" }), 350);
        }}
      />
      <MissionModal project={brief ? brief.list[brief.i] : null} index={brief?.i ?? 0} total={brief?.list.length ?? 0} onClose={close} onStep={step} />
    </>
  );
}
