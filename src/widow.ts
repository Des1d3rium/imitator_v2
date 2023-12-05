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
const player = Isaac.GetPlayer();

export function ifPlayerPickupWidow() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.JUICY_SACK);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("WidowMimesis"));

  if (postMimic !== "Not found" && postMimic !== "WidowMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("WidowMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossWidowDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("WidowMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("WidowMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("WidowMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function widowMimesisOnUse(): boolean {
  useActiveItemTemp(player, CollectibleType.SPIDER_BUTT);
  return true;
}
