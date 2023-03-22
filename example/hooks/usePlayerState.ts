import * as Settings from "expo-settings";
import { useEffect, useState } from "react";

const usePlayerState = () => {
  const [state, setState] = useState(
    Settings?.getState() || Settings.State.STATE_IDLE
  );
  useEffect(() => {
    Settings.addStateListener((state) => {
      setState(state.state);
    });
  }, []);

  return state;
};

export default usePlayerState;
