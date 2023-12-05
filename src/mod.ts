import { ISCFeature, upgradeMod } from "isaacscript-common";

const MOD_NAME = "imitator";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [ISCFeature.RUN_NEXT_ROOM] as const;
export const mod = upgradeMod(modVanilla, features);
