import * as Settings from "expo-settings";
import { useEffect, useState } from "react";

const useIsPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(Settings.getIsPlaying() || false);

  useEffect(() => {
    Settings.addPlayingListener(({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });
  }, []);
  return isPlaying;
};

export default useIsPlaying;
