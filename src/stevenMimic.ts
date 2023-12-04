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

export function ifPlayerPickupSteven() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.LITTLE_STEVEN);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("StevenMimesis"));

  if (postMimic !== "Not found" && postMimic !== "StevenMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("StevenMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossStevenDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("StevenMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("StevenMimic")) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.STEVEN_BABY)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("StevenMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

/*
This copy function is used to deal with the priority of doesEntityExist() and POST_ENTITY_KILL callback
It appears that POST_ENTITY_KILL callback would be fired when doesEntityExist() still return true,
even the entity is no longer exist in the room. When conjugate boss is meet, both functions are used
to detect whether its conjugate entity does not exist.
*/

export function postBossStevenBabyDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("StevenMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("StevenMimic")) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.STEVEN)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("StevenMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function stevenMimesisOnUse() {
  useCardTemp(Isaac.GetPlayer(), CardType.SOUL_OF_JACOB_AND_ESAU);
  return true;
}
