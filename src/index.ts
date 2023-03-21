import { EventEmitter, Subscription } from "expo-modules-core";

import ExpoSettingsModule from "./ExpoSettingsModule";

interface Person {
  name: string;
}

export function printArrayOfRecords(array: Person[]): void {
  return ExpoSettingsModule.printArrayOfRecords(array);
}

const emitter = new EventEmitter(ExpoSettingsModule);

export type Theme = "light" | "dark" | "system";

export type StateChangeEvent = {
  state: string;
};

export type TrackChangeEvent = {
  track: any;
};

export type track = {
  uri: string;
  title: string;
  artist: string;
  artwork?: string;
};

export function addStateListener(
  listener: (event: StateChangeEvent) => void
): Subscription {
  return emitter.addListener<StateChangeEvent>("onStateChange", listener);
}

export function addTrackListener(
  listener: (event: TrackChangeEvent) => void
): Subscription {
  return emitter.addListener<TrackChangeEvent>("onTrackChange", listener);
}

export function initializePlayer(): void {
  return ExpoSettingsModule.initializePlayer();
}

export function load(uri: string): void {
  return ExpoSettingsModule.load(uri);
}

export function loadMultiple(tracks: track[]): void {
  return ExpoSettingsModule.loadMultiple(tracks);
}

export function play(): void {
  return ExpoSettingsModule.play();
}

export function pause(): void {
  return ExpoSettingsModule.pause();
}

export function stop(): void {
  return ExpoSettingsModule.stop();
}

export function skipToNext(): void {
  return ExpoSettingsModule.skipToNext();
}

export function skipToPrevious(): void {
  return ExpoSettingsModule.skipToPrevious();
}

export function reset(): void {
  return ExpoSettingsModule.reset();
}
