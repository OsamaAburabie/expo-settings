import * as Settings from "expo-settings";
import { useEffect, useState } from "react";

const useIsPlaying = () => {
  const [isPlaying, setIsPlaying] = useState(Settings.getIsPlaying() || false);

  useEffect(() => {
    const sub = Settings.addPlayingListener(({ isPlaying }) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      sub.remove();
    };
  }, []);
  return isPlaying;
};

export default useIsPlaying;
