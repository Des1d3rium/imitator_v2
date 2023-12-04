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

export function ifPlayerPickupGenimi() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.GEMINI);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("GenimiMimesis"));

  if (postMimic !== "Not found" && postMimic !== "GenimiMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("GenimiMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossGenimiDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("GenimiMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("GenimiMimic")) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.GEMINI_BABY)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("GenimiMimic"),
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
export function postBossGenimiBabyDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("GenimiMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("GenimiMimic")) &&
    !doesEntityExist(EntityType.GEMINI, GeminiVariant.GEMINI)
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("GenimiMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function genimiMimesisOnUse() {
  useCardTemp(Isaac.GetPlayer(), CardType.SOUL_OF_JACOB_AND_ESAU);
  return true;
}
