import {
  CollectibleType,
  EntityType,
  PickupVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  smeltTrinket,
  spawnCollectible,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupLarry() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  smeltTrinket(Isaac.GetPlayer(), TrinketType.BRAIN_WORM);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LarryMimesis"));

  if (postMimic !== "Not found" && postMimic !== "LarryMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("LarryMimic", true);
  isNotFirstUse = false;
}

export function postBossLarryDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("LarryMimic"),
    ) &&
    doesEntityExist(EntityType.LARRY_JR)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("LarryMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function larryMimesisOnUse() {
  if (isNotFirstUse) {
    Isaac.GetPlayer().UseActiveItem(CollectibleType.WHITE_PONY);
  } else {
    isNotFirstUse = true;
  }
}
