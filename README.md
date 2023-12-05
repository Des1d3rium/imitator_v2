# imitator

imitator is a mod for [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/), written in [TypeScript](https://www.typescriptlang.org/) using the [IsaacScript](https://isaacscript.github.io/) framework.

## How To Play

For normal people, you can play the mod by putting files in [release](https://github.com/AinfinitedZ/imitator_v2/releases/tag/v1.0) into `mod` folders under `The Binding of Isaac`(you could find the folder by browse local file in Steam). 

## How To Compile

If you are a developer, or if the mod is not yet uploaded to the Steam Workshop, you can play the mod by compiling the TypeScript code into a "main.lua" file. Perform the following steps:

- Download and install [Node.js](https://nodejs.org/en/download/) (Windows Installer .msi, 64-bit).
- Download and install [Git](https://git-scm.com/download/win) (64-bit Git for Windows setup).
- Download (or clone) this repository:
  - Click on the "Code" button in the top-right-corner of this page.
  - Click on "Download ZIP".
- Unzip the zip file to a new directory.
- Open the command prompt (or another shell of your choice).
- Use the `cd` command to navigate to the place where you unzipped the repository.
- Use the `npm ci` command to install the project dependencies.
- Use the `npx isaacscript` command to start the IsaacScript watcher.
- If IsaacScript is successful, you will see "Compilation successful." (You can continue to leave the terminal window open; it will monitor for changes in your project, and recompile if necessary.)
- Completely close Isaac if it is already open, and then open the game again, and the mod should be in the list of mods. You can now play or test the mod.

## For graders

In this project, we have used dependencies from [IsaacScript](https://isaacscript.github.io/). Our original codes are stored in `src`(mostly .ts files), `test`, and `content`(mostly .xml files). 

## Status of known bugs

Due to definition in dependency library, `ReferenceError: BitSet128 is not defined` would occurs if one directly run `mimic.test.ts`. We can't determine the cause of this exception. If one want to test the file, one has to comment the dependencies out, and cancel comments after the test is done. 

