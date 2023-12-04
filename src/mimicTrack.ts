import { CollectibleType, TrinketType } from "isaac-typescript-definitions";
import {
  getRandomInt,
  removeCollectible,
  temporarilyRemoveTrinket,
} from "isaacscript-common";

let mimicTrack = new Map<string, boolean>();

let RNG = getRandomInt(1, 128, undefined);

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

export function resetMimicTrack() {
  mimicTrack = new Map([
    ["MonstroMimic", false],
    ["LarryMimic", false],
    ["GenimiMimic", false],
    ["StevenMimic", false],
    ["DukeMimic", false],
    ["HauntMimic", false],
    ["MomMimic", false],
    ["LittleHornMimic", false],
    ["DingleMimic", false],
    ["DangleMimic", false],
  ]);
}

export function getRNG() {
  let preusedRNG = RNG;
  RNG = getRandomInt(1, 128, undefined);
  return preusedRNG;
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
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("GenimiMimic"),
      );
      break;
    }

    case "StevenMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("StevenMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.LITTLE_STEVEN);
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("StevenMimic"),
      );
      break;
    }

    case "DukeMimic": {
      removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DukeMimic"));
      removeCollectible(Isaac.GetPlayer(), CollectibleType.SKATOLE);

      break;
    }

    case "HauntMimic": {
      removeCollectible(Isaac.GetPlayer(), CollectibleType.LIL_HAUNT);
      removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("HauntMimic"));

      break;
    }

    case "MomMimic": {
      removeCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MomMimic"));
      break;
    }

    case "LittleHornMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("LittleHornMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.LITTLE_HORN);

      break;
    }

    case "DingleMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("DingleMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.DIRTY_MIND);

      break;
    }

    case "DangleMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("DangleMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.DIRTY_MIND);

      break;
    }

    case "BabyPlumMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("BabyPlumMimic"),
      );
      removeCollectible(
        Isaac.GetPlayer(),
        CollectibleType.BLUE_BABYS_ONLY_FRIEND,
      );

      break;
    }

    case "RagManMimic": {
      removeCollectible(
        Isaac.GetPlayer(),
        Isaac.GetItemIdByName("RagManMimic"),
      );
      removeCollectible(Isaac.GetPlayer(), CollectibleType.SPOON_BENDER);

      break;
    }
  }
}
