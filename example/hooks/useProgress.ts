import * as Settings from "expo-settings";
import { useEffect, useState } from "react";

import usePlayerState from "./usePlayerState";
import useIsPlaying from "./usePlaying";

const useProgress = () => {
  const isPlaying = useIsPlaying();
  const state = usePlayerState();
  const [progress, setProgress] = useState({
    position: 0,
    duration: 0,
  });

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress({
          position: Settings.getPosition(),
          duration: Settings.getDuration(),
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (state === Settings.State.STATE_IDLE) {
      setProgress({
        position: 0,
        duration: 0,
      });
    }

    if (state === Settings.State.STATE_READY) {
      setProgress({
        position: Settings.getPosition(),
        duration: Settings.getDuration(),
      });
    }
  }, [state]);

  return { progress };
};

export default useProgress;
