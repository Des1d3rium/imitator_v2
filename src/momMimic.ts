import {
  CardType,
  EntityType,
  PickupVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getRandomInt,
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
const MomPool = [
  29, 30, 31, 55, 110, 114, 139, 195, 199, 200, 217, 228, 355, 508, 732,
] as const;
let RNG = getRandomInt(1, 15, undefined);
let itemID = MomPool[RNG];

export function ifPlayerPickupMom() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  if (itemID !== undefined && !hasCollectible(Isaac.GetPlayer(), itemID)) {
    addCollectible(Isaac.GetPlayer(), itemID);
  }
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MomMimesis"));

  if (postMimic !== "Not found" && postMimic !== "MomMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("MomMimic", true);
  isNotFirstUse = false;
}

export function postBossMomDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("MomMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("MomMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("MomMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function momMimesisOnUse() {
  useCardTemp(Isaac.GetPlayer(), CardType.HIGH_PRIESTESS);
  return true;
}

export function newMomRNG() {
  RNG = getRandomInt(1, 15, undefined);
  itemID = MomPool[RNG];
}
