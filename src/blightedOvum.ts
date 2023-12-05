import {
  CardType,
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
    )
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
