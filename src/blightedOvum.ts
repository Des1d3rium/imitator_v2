import {
  CardType,
  CollectibleType,
  EntityType,
  GeminiVariant,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  hasCollectible,
  spawnCollectible,
  useCardTemp,
} from "isaacscript-common";

import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupBlightedOvum() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.LIL_BRIMSTONE);
  addCollectible(
    Isaac.GetPlayer(),
    Isaac.GetItemIdByName("BlightedOvumMimesis"),
  );

  if (postMimic !== "Not found" && postMimic !== "BlightedOvumMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("BlightedOvumMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossBlightedOvumDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("BlightedOvumMimic"),
    ) &&
    !hasCollectible(
      Isaac.GetPlayer(),
      Isaac.GetItemIdByName("BlightedOvumMimic"),
    ) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.BLIGHTED_OVUM_BABY)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("BlightedOvumMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

/*
This copy function is used to deal with the priority of doesEntityExist() and POST_ENTITY_KILL callback
It appears that POST_ENTITY_KILL callback would be fired when doesEntityExist() still return true,
even the entity is no longer exist in the room. When conjugate boss is meet, both functions are called
to detect whether its conjugate entity does not exist.
*/
export function postBossBlightedOvumBabyDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("BlightedOvumMimic"),
    ) &&
    !hasCollectible(
      Isaac.GetPlayer(),
      Isaac.GetItemIdByName("BlightedOvumMimic"),
    ) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.BLIGHTED_OVUM)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("BlightedOvumMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function BlightedOvumMimesisOnUse() {
  useCardTemp(Isaac.GetPlayer(), CardType.SOUL_OF_JACOB_AND_ESAU);
  return true;
}
