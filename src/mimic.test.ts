import {
  isMimicSpecificBoss,
  iterateMimicTrack,
  setMimicSpecificBoss,
} from "../src/mimicTrack";

describe("testing index file", () => {
  it("unacceptable input should result in an undefined", () => {
    expect(isMimicSpecificBoss("randomBossName")).toBe(undefined);
  });
});

describe("testing index file", () => {
  it("empty input should result in an undefined", () => {
    expect(isMimicSpecificBoss("")).toBe(undefined);
  });
});

describe("testing index file", () => {
  it("an acceptable input should result in an default false", () => {
    expect(isMimicSpecificBoss("MonstroMimic")).toBe(false);
  });
});

describe("testing index file", () => {
  it("an acceptable input should result in an default false", () => {
    expect(isMimicSpecificBoss("LarryMimic")).toBe(false);
  });
});

describe("testing index file", () => {
  it("After modifying the value, MonstroMimic should result in true", () => {
    setMimicSpecificBoss("MonstroMimic", true);
    expect(isMimicSpecificBoss("MonstroMimic")).toBe(true);
  });
  it("while other input should still result in an default false", () => {
    expect(isMimicSpecificBoss("LarryMimic")).toBe(false);
  });
});

describe("testing index file", () => {
  it("By iterating the Mimic Track, we could find out the previous mimic", () => {
    expect(iterateMimicTrack()).toBe("MonstroMimic");
  });
});

describe("testing index file", () => {
  it("Iterating the mimic Track would eliminate previous mimic and expect for next mimic", () => {
    expect(iterateMimicTrack()).toBe("Not found");
  });
});
