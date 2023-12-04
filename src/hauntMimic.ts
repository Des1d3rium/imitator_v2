import {
  CollectibleType,
  EntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  hasCollectible,
  spawnCollectible,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupHaunt() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.LIL_HAUNT);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("HauntMimesis"));

  if (postMimic !== "Not found" && postMimic !== "HauntMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("HauntMimic", true);
  isNotFirstUse = false;
}

export function postBossHauntDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("HauntMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("HauntMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("HauntMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function hauntMimesisOnUse(): boolean {
  Isaac.GetPlayer().UseActiveItem(CollectibleType.MR_ME);
  return true;
}
