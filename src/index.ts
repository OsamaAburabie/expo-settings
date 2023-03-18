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

export type ThemeChangeEvent = {
  theme: Theme;
};

export function addThemeListener(
  listener: (event: ThemeChangeEvent) => void
): Subscription {
  return emitter.addListener<ThemeChangeEvent>("onChangeTheme", listener);
}

export function getTheme(): Theme {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return ExpoSettingsModule.setTheme(theme);
}
export function printArray(array: string[]): void {
  return ExpoSettingsModule.printArray(array);
}
v;
