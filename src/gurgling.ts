import {
  CollectibleType,
  EntityType,
  FamiliarVariant,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  hasCollectible,
  spawn,
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

export function ifPlayerPickupGurgling() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.CUBE_OF_MEAT);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("GurglingMimesis"));

  if (postMimic !== "Not found" && postMimic !== "GurglingMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("GurglingMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossGurglingDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("GurglingMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("GurglingMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("GurglingMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function gurglingMimesisOnUse(): boolean {
  useActiveItemTemp(player, CollectibleType.PONY);
  for (let i = 0; i < 2; i++) {
    spawn(
      EntityType.FAMILIAR,
      FamiliarVariant.BLUE_FLY,
      0,
      findFreePosition(Isaac.GetPlayer().Position),
    );
  }
  return true;
}
