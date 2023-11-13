import {
  CollectibleType,
  EffectVariant,
  EntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getEntities,
  isActiveEnemy,
  spawnCollectible,
  spawnEffect,
} from "isaacscript-common";
import {
  iterateMimicTrack,
  removePreviousMimic,
  setMimicSpecificBoss,
} from "./mimicTrack";

let isNotFirstUse = false;

export function ifPlayerPickupMonstro() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.MONSTROS_LUNG);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimesis"));

  if (postMimic !== "Not found" && postMimic !== "MonstroMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss("MonstroMimic", true);
  setMimicSpecificBoss(postMimic, false);
  isNotFirstUse = false;
}

export function postBossMonstroDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("MonstroMimic"),
    )
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("MonstroMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function monstroMimesisOnUse() {
  if (isNotFirstUse) {
    const Entities = getEntities(-1, -1, -1, true);
    for (const entity of Entities) {
      if (entity !== undefined && isActiveEnemy(entity)) {
        spawnEffect(EffectVariant.MONSTROS_TOOTH, 0, entity.Position);
        break;
      }
    }
  } else {
    isNotFirstUse = true;
  }
}
