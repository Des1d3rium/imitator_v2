import { EntityType, GeminiVariant } from "isaac-typescript-definitions";
import { ISCFeature, ModCallbackCustom, upgradeMod } from "isaacscript-common";
import {
  dukeMimesisOnUse,
  ifPlayerPickupDuke,
  postBossDukeDefeated,
} from "./dukeMimic";
import {
  genimiMimesisOnUse,
  ifPlayerPickupGenimi,
  postBossGenimiDefeated,
} from "./genimiMimic";
import {
  ifPlayerPickupLarry,
  larryMimesisOnUse,
  postBossLarryDefeated,
} from "./larryMimic";
import { onuse } from "./mimesis";
import {
  ifPlayerPickupMonstro,
  monstroMimesisOnUse,
  postBossMonstroDefeated,
} from "./monstroMimic";
import {
  ifPlayerPickupSteven,
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
  mod.AddCallbackCustom(ModCallbackCustom.POST_ITEM_DISCHARGE, onuse);

  // Monstro callback handle
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ENTITY_KILL_FILTER,
    postBossMonstroDefeated,
    EntityType.MONSTRO,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupMonstro,
    1,
    Isaac.GetItemIdByName("MonstroMimic"),
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_DISCHARGE,
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
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_DISCHARGE,
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
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupGenimi,
    1,
    Isaac.GetItemIdByName("GenimiMimic"),
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_DISCHARGE,
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
    ModCallbackCustom.POST_ITEM_PICKUP,
    ifPlayerPickupSteven,
    1,
    Isaac.GetItemIdByName("StevenMimic"),
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_DISCHARGE,
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
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_ITEM_DISCHARGE,
    dukeMimesisOnUse,
    Isaac.GetItemIdByName("DukeMimesis"),
  );
}
