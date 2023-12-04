import {
  DingleVariant,
  EntityType,
  GeminiVariant,
  HauntVariant,
  LittleHornVariant,
  ModCallback,
  MonstroSubType,
} from "isaac-typescript-definitions";
import { ISCFeature, ModCallbackCustom, upgradeMod } from "isaacscript-common";
import {
  babyPlumMimesisOnUse,
  ifPlayerPickupBabyPlum,
  postBossBabyPlumDefeated,
} from "./babyPlumMimic";
import {
  dangleMimesisOnUse,
  ifPlayerPickupDangle,
  postBossDangleDefeated,
} from "./dangleMimic";
import {
  dingleMimesisOnUse,
  ifPlayerPickupDingle,
  postBossDingleDefeated,
} from "./dingleMimic";
import {
  dukeMimesisOnUse,
  ifPlayerPickupDuke,
  postBossDukeDefeated,
} from "./dukeMimic";
import {
  genimiMimesisOnUse,
  ifPlayerPickupGenimi,
  postBossGenimiBabyDefeated,
  postBossGenimiDefeated,
} from "./genimiMimic";
import {
  hauntMimesisOnUse,
  ifPlayerPickupHaunt,
  postBossHauntDefeated,
} from "./hauntMimic";
import {
  ifPlayerPickupLarry,
  larryMimesisOnUse,
  postBossLarryDefeated,
} from "./larryMimic";
import {
  ifPlayerPickupLittleHorn,
  littleHornMimesisOnUse,
  postBossLittleHornDefeated,
} from "./littleHornMimic";
import { resetMimicTrack } from "./mimicTrack";
import {
  ifPlayerPickupMom,
  momMimesisOnUse,
  newMomRNG,
  postBossMomDefeated,
} from "./momMimic";
import {
  ifPlayerPickupMonstro,
  monstroMimesisOnUse,
  postBossMonstroDefeated,
  postBossMonstroRedDefeated,
} from "./monstroMimic";
import {
  ifPlayerPickupRagMan,
  postBossRagManDefeated,
  ragManMimesisOnUse,
} from "./ragManMimic";
import {
  ifPlayerPickupSteven,
  postBossStevenBabyDefeated,
  postBossStevenDefeated,
  stevenMimesisOnUse,
} from "./stevenMimic";

const MOD_NAME = "imitator";
const modVanilla = RegisterMod(MOD_NAME, 1);
const features = [
  ISCFeature.RUN_IN_N_FRAMES,
  ISCFeature.DISABLE_INPUTS,
] as const;
export const mod = upgradeMod(modVanilla, features);

export function main(): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GAME_STARTED_REORDERED,
    resetMimicTrack,
    undefined,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GAME_STARTED_REORDERED,
    newMomRNG,
    undefined,
  );

  // Monstro callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossMonstroDefeated,
    EntityType.MONSTRO,
    0,
    MonstroSubType.NORMAL,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossMonstroDefeated,
    EntityType.MONSTRO,
    0,
    MonstroSubType.GREY,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossMonstroRedDefeated,
    EntityType.MONSTRO,
    0,
    MonstroSubType.RED,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupMonstro,
    1,
    Isaac.GetItemIdByName("MonstroMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    monstroMimesisOnUse,
    Isaac.GetItemIdByName("MonstroMimesis"),
  );
  // Larry Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossLarryDefeated,
    EntityType.LARRY_JR,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupLarry,
    1,
    Isaac.GetItemIdByName("LarryMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    larryMimesisOnUse,
    Isaac.GetItemIdByName("LarryMimesis"),
  );
  // Gemini Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossGenimiDefeated,
    EntityType.GEMINI,
    GeminiVariant.GEMINI,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossGenimiBabyDefeated,
    EntityType.GEMINI,
    GeminiVariant.GEMINI_BABY,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupGenimi,
    1,
    Isaac.GetItemIdByName("GenimiMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    genimiMimesisOnUse,
    Isaac.GetItemIdByName("GenimiMimesis"),
  );
  // Steven Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossStevenDefeated,
    EntityType.GEMINI,
    GeminiVariant.STEVEN,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossStevenBabyDefeated,
    EntityType.GEMINI,
    GeminiVariant.STEVEN_BABY,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupSteven,
    1,
    Isaac.GetItemIdByName("StevenMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    stevenMimesisOnUse,
    Isaac.GetItemIdByName("StevenMimesis"),
  );

  // Duke of Flies Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossDukeDefeated,
    EntityType.DUKE_OF_FLIES,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupDuke,
    1,
    Isaac.GetItemIdByName("DukeMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    dukeMimesisOnUse,
    Isaac.GetItemIdByName("DukeMimesis"),
  );

  // Haunt Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossHauntDefeated,
    EntityType.HAUNT,
    HauntVariant.HAUNT,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupHaunt,
    1,
    Isaac.GetItemIdByName("HauntMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    hauntMimesisOnUse,
    Isaac.GetItemIdByName("HauntMimesis"),
  );

  // Mom Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossMomDefeated,
    EntityType.MOM,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupMom,
    1,
    Isaac.GetItemIdByName("MomMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    momMimesisOnUse,
    Isaac.GetItemIdByName("MomMimesis"),
  );

  // Little horn Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossLittleHornDefeated,
    EntityType.LITTLE_HORN,
    LittleHornVariant.LITTLE_HORN,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupLittleHorn,
    1,
    Isaac.GetItemIdByName("LittleHornMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    littleHornMimesisOnUse,
    Isaac.GetItemIdByName("LittleHornMimesis"),
  );

  // dingle Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossDingleDefeated,
    EntityType.DINGLE,
    DingleVariant.DINGLE,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupDingle,
    1,
    Isaac.GetItemIdByName("DingleMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    dingleMimesisOnUse,
    Isaac.GetItemIdByName("DingleMimesis"),
  );

  // dangle Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossDangleDefeated,
    EntityType.DINGLE,
    DingleVariant.DANGLE,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupDangle,
    1,
    Isaac.GetItemIdByName("DangleMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    dangleMimesisOnUse,
    Isaac.GetItemIdByName("DangleMimesis"),
  );

  // Baby Plum Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossBabyPlumDefeated,
    EntityType.BABY_PLUM,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupBabyPlum,
    1,
    Isaac.GetItemIdByName("BabyPlumMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    babyPlumMimesisOnUse,
    Isaac.GetItemIdByName("BabyPlumMimesis"),
  );

  // Rag Man Callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossRagManDefeated,
    EntityType.RAG_MAN,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupRagMan,
    1,
    Isaac.GetItemIdByName("RagManMimic"),
  );
  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    ragManMimesisOnUse,
    Isaac.GetItemIdByName("RagManMimesis"),
  );
}
