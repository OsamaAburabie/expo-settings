import * as Settings from "expo-settings";
import { useEffect, useState } from "react";

const useActiveTrack = () => {
  const [activeTrack, setActiveTrack] = useState<Settings.TrackMetaData | null>(
    Settings?.getCurrentTrack()
  );

  useEffect(() => {
    Settings.addTrackListener(({ track }) => {
      setActiveTrack(track);
    });
  }, []);

  return activeTrack;
};

export default useActiveTrack;
