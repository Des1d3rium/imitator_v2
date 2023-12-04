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
  useActiveItemTemp,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupBabyPlum() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.BLUE_BABYS_ONLY_FRIEND);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("BabyPlumMimesis"));

  if (postMimic !== "Not found" && postMimic !== "BabyPlumMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("BabyPlumMimic", true);
  isNotFirstUse = false;
}

export function postBossBabyPlumDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("BabyPlumMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("BabyPlumMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("BabyPlumMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function babyPlumMimesisOnUse(): boolean {
  useActiveItemTemp(Isaac.GetPlayer(), CollectibleType.PLUM_FLUTE);
  return true;
}
