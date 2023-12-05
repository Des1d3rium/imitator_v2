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
  removeCollectible,
  spawnCollectible,
} from "isaacscript-common";

import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";
import { mod } from "./mod";

let isNotFirstUse = false;

export function ifPlayerPickupFamine() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.CUBE_OF_MEAT);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("FamineMimesis"));

  if (postMimic !== "Not found" && postMimic !== "FamineMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("FamineMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossFamineDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("FamineMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("FamineMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("FamineMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function famineMimesisOnUse(): boolean {
  addCollectible(Isaac.GetPlayer(), CollectibleType.SEVEN_SEALS);

  mod.runNextRoom(() => {
    removeCollectible(Isaac.GetPlayer(), CollectibleType.SEVEN_SEALS);
  });
  return true;
}
