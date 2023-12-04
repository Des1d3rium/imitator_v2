import {
  CollectibleType,
  DipVariant,
  EntityType,
  FamiliarVariant,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getRandomInt,
  hasCollectible,
  spawn,
  spawnCollectible,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupDangle() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.DIRTY_MIND);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DangleMimesis"));

  if (postMimic !== "Not found" && postMimic !== "DangleMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("DangleMimic", true);
  isNotFirstUse = false;
}

export function postBossDangleDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("DangleMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DangleMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("DangleMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function dangleMimesisOnUse(): boolean {
  const numberOfDangles = getRandomInt(4, 8, undefined);
  for (let i = 0; i < numberOfDangles; i++) {
    spawn(
      EntityType.FAMILIAR,
      FamiliarVariant.DIP,
      DipVariant.BROWNIE_CORN,
      findFreePosition(Isaac.GetPlayer().Position),
    );
  }
  return true;
}
