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
    )
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("StevenMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function stevenMimesisOnUse() {
  if (isNotFirstUse) {
    useCardTemp(Isaac.GetPlayer(), CardType.SOUL_OF_JACOB_AND_ESAU);
  } else {
    isNotFirstUse = true;
  }
}
