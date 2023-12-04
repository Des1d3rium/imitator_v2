import {
  CollectibleType,
  EntityType,
  PickupVariant,
  RaglingVariant,
} from "isaac-typescript-definitions";
import {
  addCollectible,
  doesEntityExist,
  findFreePosition,
  getRandomInt,
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

export function ifPlayerPickupRagMan() {
  const postMimic = iterateMimicTrack();
  removePreviousMimic(postMimic);
  addCollectible(Isaac.GetPlayer(), CollectibleType.SPOON_BENDER);
  addCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("RagManMimesis"));

  if (postMimic !== "Not found" && postMimic !== "RagManMimic") {
    spawnCollectible(
      Isaac.GetItemIdByName(postMimic),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
  setMimicSpecificBoss(postMimic, false);
  setMimicSpecificBoss("RagManMimic", true);
  isNotFirstUse = false;
}

export function postBossRagManDefeated() {
  if (
    !doesEntityExist(
      EntityType.PICKUP,
      PickupVariant.COLLECTIBLE,
      Isaac.GetItemIdByName("RagManMimic"),
    ) &&
    !hasCollectible(Isaac.GetPlayer(), Isaac.GetItemIdByName("RagManMimic"))
  ) {
    spawnCollectible(
      Isaac.GetItemIdByName("RagManMimic"),
      findFreePosition(Vector(300, 280)),
      undefined,
    );
  }
}

export function ragManMimesisOnUse(): boolean {
  const numberOfRagMans = getRandomInt(4, 8, undefined);
  for (let i = 0; i < numberOfRagMans; i++) {
    const ragling = spawn(
      EntityType.RAGLING,
      RaglingVariant.RAG_MANS_RAGLING,
      0,
      findFreePosition(Isaac.GetPlayer().Position),
    );
    ragling.AddCharmed(EntityRef(Isaac.GetPlayer()), -1);
  }
  return true;
}
