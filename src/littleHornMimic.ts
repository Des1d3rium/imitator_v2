import {
  CollectibleType,
  EntityType,
  LittleHornSubType,
  LittleHornVariant,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
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

export function ifPlayerPickupLittleHorn() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.LITTLE_HORN);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LittleHornMimesis"));

  if (postMimic !== "Not found" && postMimic !== "LittleHornMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("LittleHornMimic", true);
  isNotFirstUse = false;
}

export function postBossLittleHornDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("LittleHornMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("LittleHornMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("LittleHornMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function littleHornMimesisOnUse(): boolean {
  const darkball = spawn(
    EntityType.LITTLE_HORN,
    LittleHornVariant.DARK_BALL,
    LittleHornSubType.NORMAL,
    findFreePosition(Isaac.GetPlayer().Position),
  );
  darkball.AddCharmed(EntityRef(Isaac.GetPlayer()), -1);
  return true;
}
