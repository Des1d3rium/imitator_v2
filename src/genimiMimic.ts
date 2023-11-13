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
    )
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("GenimiMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function genimiMimesisOnUse() {
  if (isNotFirstUse) {
    useCardTemp(Isaac.GetPlayer(), CardType.SOUL_OF_JACOB_AND_ESAU);
  } else {
    isNotFirstUse = true;
  }
}
