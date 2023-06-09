import * as Settings from "expo-settings";
import * as React from "react";
import { Button, Text, View } from "react-native";

import MetaData from "./components/MetaData";
import useIsPlaying from "./hooks/usePlaying";
import useProgress from "./hooks/useProgress";

export default function App() {
  React.useEffect(() => {
    Settings.initializePlayer();
  }, []);

  const [show, setShow] = React.useState(false);

  const PlayButton = () => {
    const playing = useIsPlaying();
    const { progress } = useProgress();

    return (
      <View
        style={{
          padding: 10,
          backgroundColor: "#f4f4f4",
        }}
      >
        <Text>{playing ? "Pause" : "Play"}</Text>
        <Text>{progress?.duration}</Text>
        <Text>{progress?.position}</Text>

        <MetaData />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="load"
        onPress={() =>
          Settings.load(
            "https://cdn.pixabay.com/audio/2022/02/11/audio_25f3f87b24.mp3"
          )
        }
      />
      <Button
        title="loadAnother"
        onPress={() =>
          Settings.load(
            "https://cdn.pixabay.com/audio/2022/02/17/audio_c48f6760a3.mp3"
          )
        }
      />

      <Button
        title="load Multiple"
        onPress={() =>
          Settings.loadMultiple([
            {
              artist: "artist1",
              title: "title1",
              uri: "https://cdn.pixabay.com/audio/2022/02/11/audio_25f3f87b24.mp3",
              artwork:
                "https://cdn.pixabay.com/photo/2021/02/11/10/35/landscape-6002818_960_710.jpg",
            },
            {
              artist: "artist2",
              title: "title2",
              uri: "https://cdn.pixabay.com/audio/2022/02/17/audio_c48f6760a3.mp3",
              artwork:
                "https://cdn.pixabay.com/photo/2021/02/17/10/35/landscape-6022818_960_720.jpg",
            },
          ])
        }
      />

      {show && <PlayButton />}
      <Button title="play" onPress={() => Settings.play()} />
      <Button title="pause" onPress={() => Settings.pause()} />
      <Button title="reset" onPress={() => Settings.reset()} />
      <Button title="next" onPress={() => Settings.skipToNext()} />
      <Button title="prev" onPress={() => Settings.skipToPrevious()} />
      <Button title="state" onPress={() => setShow((prev) => !prev)} />
      <Button
        title="print array of records"
        onPress={() =>
          Settings.printArrayOfRecords([
            {
              name: "a",
            },
            {
              name: "b",
            },
            {
              name: "c",
            },
          ])
        }
      />
    </View>
  );
}
