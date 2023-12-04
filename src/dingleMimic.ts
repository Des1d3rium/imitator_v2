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

export function ifPlayerPickupDingle() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.DIRTY_MIND);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DingleMimesis"));

  if (postMimic !== "Not found" && postMimic !== "DingleMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("DingleMimic", true);
  isNotFirstUse = false;
}

export function postBossDingleDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("DingleMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("DingleMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("DingleMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function dingleMimesisOnUse(): boolean {
  const numberOfDingles = getRandomInt(4, 8, undefined);
  for (let i = 0; i < numberOfDingles; i++) {
    spawn(
      EntityType.FAMILIAR,
      FamiliarVariant.DIP,
      DipVariant.DIP,
      findFreePosition(Isaac.GetPlayer().Position),
    );
  }
  return true;
}
