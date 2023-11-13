import { CollectibleType, TrinketType } from "isaac-typescript-definitions";
import {
  removeCollectible,
  temporarilyRemoveTrinket,
} from "isaacscript-common";

let mimicTrack = new Map([
  ["MonstroMimic", false],
  ["LarryMimic", false],
  ["GenimiMimic", false],
  ["StevenMimic", false],
  ["DukeMimic", false],
]);

export function isMimicSpecificBoss(bossName: string): boolean | undefined {
  return mimicTrack.get(bossName);
}

export function setMimicSpecificBoss(bossName: string, value: boolean) {
  mimicTrack.set(bossName, value);
}

export function iterateMimicTrack(): string {
  for (let entry of mimicTrack) {
    if (entry[1]) {
      setMimicSpecificBoss(entry[0], false);
      return entry[0];
    }
  }
  return "Not found";
}

export function removePreviousMimic(postMimic: string) {
  switch (postMimic) {
    case "MonstroMimic": {
      removeCollectible(Isaac.GetPlayer(), CollectibleType.MONSTROS_LUNG);
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("MonstroMimesis"),
      );
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("MonstroMimic"),
      );

      break;
    }

    case "LarryMimic": {
      temporarilyRemoveTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);
      removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimic"));

      break;
    }

    case "GenimiMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("GenimiMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.GEMINI);

      break;
    }

    case "StevenMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("StevenMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.LITTLE_STEVEN);

      break;
    }

    case "DukeMimic": {
      removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DukeMimic"));
      removeCollectible(Isaac.GetPlayer(), CollectibleType.SKATOLE);

      break;
    }
  }
}
