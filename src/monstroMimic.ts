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
  hasCollectible,
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
let noPreviousMimic = false;

/*
this variant is used to count how many red-variant monstro are defeated.
Under most cases, there would exist two red-variant. The collectible will be spawned after
both of them are defeated.
*/
let monstroRedVariantCount = 0;

export function ifPlayerPickupMonstro() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.MONSTROS_LUNG);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimesis"));
  if (postMimic === "Not found") {
    noPreviousMimic = true;
  }

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
  monstroRedVariantCount = 0;
}

export function postBossMonstroDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("MonstroMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("MonstroMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function postBossMonstroRedDefeated() {
  monstroRedVariantCount++;
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("MonstroMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MonstroMimic")) &&
    monstroRedVariantCount === 2
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("MonstroMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function monstroMimesisOnUse(): boolean {
  const Entities = getEntities(-1, -1, -1, true);
  for (const entity of Entities) {
    if (entity !== undefined && isActiveEnemy(entity)) {
      spawnEffect(EffectVariant.MONSTROS_TOOTH, 0, entity.Position);
      break;
    }
  }
  return true;
}
