---
{"Publish":true,"permalink":"/files-and-shit/repairing-saves/","noteIcon":"Skull/Concentrated Brain/Journaling Before It Gets Amalgamated/10·2026/Files And Shit/fish-off.svg","updated":"284·10·2026 3:24 (Sunday)","dg-note-properties":{"Date Created":"200·07·2026 12:37 (Sunday)","Date Modified":"284·10·2026 3:24 (Sunday)"}}
---


## About Saves In DemonCrawl

Let's first go over some important information about how DemonCrawl handles your save files.

DemonCrawl will refuse to load a profile if **both** of these problems occur:

- The profile's assigned device ID does **not** match your computer's device ID.
- The profile's cloud ID (i.e. the Steam account) does **not** match your current cloud ID.

If one condition is true but not the other, you should be able to continue playing on that profile.

In terms of syncing to the cloud, DemonCrawl will only overwrite your cloud save if **the local save is found to have greater prestige, or equal prestige but greater XP.**

When loading a profile, the game client chooses between your local save and the cloud save based on the same criteria above.

## Acquire Your Backups (Important!)

If DemonCrawl refuses to load your profile, the first thing you should do is **take a backup of your backups.**

By default, DemonCrawl creates up to 100 backup saves while you play. If your profile is corrupt, there is a chance one of the backup saves will work, and the last thing you want to do is accidentally overwrite a valuable working copy with a corrupt one.

Your backups are stored here:

```
%localappdata%/demoncrawl/backups/profilename
```

Copy your entire folder to a safe location.

Similarly, you should download a copy of your Steam Cloud data. It is available here:

- https://store.steampowered.com/account/remotestorage

## Check Your Repair Log

When DemonCrawl can't load your profile, it will ask if you want to try repairs. Do so. Even if the repairs don't work, the game generates a log file that may contain helpful clues.

The log file is available here:

```
%localappdata%/demoncrawl/logs/_repairs.txt
```

Here are some examples of clues you might find in your repair log:

### Missing Device ID

```
The device ID for this profile was not found in device_id.dat. Trying lowercase...
Still could not find a device ID for this profile.
The local ID associated with this DemonCrawl profile is missing. If we can validate your Steam ID in the next step, we will generate a local ID as well.
```

Your `device_id.dat` is a master index of profiles created on your computer, and the profile you're trying to load was not found in the master index. This file is available here: `%localappdata%/demoncrawl/device_id.dat`.

This problem typically only occurs after changing PCs, and the game should be able to solve it automatically if you have a working Steam connection.

### Steam Connectivity Problems

```
There was a problem connecting to Steam services. Please review the following lines for additional diagnostic information:
1/4 - Is Steam initialized? 0
2/4 - Are Steam stats ready? 0
3/4 - Is Steam Cloud enabled for your account? 0
4/4 - Is Steam Cloud enabled for the app? 0
```

These lines give you information about the status of your Steam connection. If they're 0s across the board, that usually means DemonCrawl's Steamworks extension isn't running correctly. This can occur if you're playing on an unsupported operating system, such as on certain Linux distros or through Proton. The good news is that your profile data is most likely not corrupted.

If you see some 0s and 1s mixed together, you may need to try adjusting cloud-related permissions on your Steam account.

### Testing A Backup Save

Assuming you took backups of your backups, you can safely visit the in-game Options (i.e. through a fresh profile), go to the Network tab, and press "Delete Steam Cloud Data." Close the game completely. Now let's check your save file backups:

- If you see a backup that looks significantly larger than the rest (e.g. 37kb vs 2kb), that's a sign of a working backup.
- If the filesizes are all pretty much the same, choose the oldest file based on the Date Modified timestamp.

Copy your selected file to `%localappdata%/demoncrawl/saves` and relaunch the game.

If the error persists and the repair log wasn't helpful, we're dealing with an uncommon culprit. Possible explanations include: a misconfigured firewall, overprotective antivirus, general file permission issues, problems with the game cache integrity, and an outage in the cloud service. At this point, it's worth trying the save file on a different Windows PC (connected to the same Steam account) and reviewing the repair log on *that* machine. If the symptoms persist, then it's fairly safe to say the profile data and all backups are genuinely corrupt and unrecoverable.
