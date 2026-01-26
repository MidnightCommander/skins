How to update mc's "screenshots"
================================


By "screenshot" what we mean is a text dump of its contents, with proper
markers so that colors and Unicode symbols of skins can be applied to it
run-time in the skin viewer.

Over time, mc's look changes slightly. It's desirable to update these
screenshots every once in a while.

Currently it is a semi-manual, semi-automated process.


Special mc build
================

Follow the latest instructions at

    https://github.com/MidnightCommander/skins/issues/11

to create a special mc build that is capable of creating screenshot templates.

If the patch no longer applies, please update it and attach it to the issue.

Run this special build of mc. You can use whichever skin you want to, it won't
make a difference. Notice that line drawing and other special characters look
broken, that's by design, just go with it.

When mc is idle, send it a SIGUSR1. Verify that a new file

    /tmp/mc-screenshot-(timestamp).html

was created.

You might also try this while mc is busy performing some task, e.g. copying a
file, but the signal handler code is unsafe and might clash with mc's
operation, causing a crash or other unwanted behavior.


Manually drive mc to the desired screenshot points
==================================================

The following steps navigate you to create similar screenshots to the current
ones. Of course the new ones don't have to represent the exact same position.
Feel free to diverge, and preferably update these instructions if you have
better ideas what looks to showcase.

Open a terminal of the desired size. Currently the screenshots are 100x32.

Start up this special mc build.

Use the default skin. (Any skin should work, as long as all the color keywords
are present in the skin file, even if with empty value. But missing keywords
might cause problems.) Fix the default skin if any keyword is missing.

Make sure that the visible core settings are identical. E.g. menubar, hintbar
enabled, shadows enabled.

After getting to each of the following states, dump a screenshot as described
above.

Panel - Full
------------

  Left panel:
  - /etc or some other directory that preferably doesn't reveal
    personal information.
  - Navigate to the entry you want to see at the bottom.

  Right panel:
  - Run ./create-mc-demo-colors-dir.sh to create a directory with
    those files (will ask for root password for the device node).
  - Navigate there.
  - Tag (Insert / Ctrl+T) the two "marked-file-*" files.
  - Move the cursor to "marked-file-1".
  - Alt+')' (Alt+Shift+0 in US kbd layout) to scroll the long filename.

  Open Left menu and navigate to the third item.

Panel - Brief
-------------

  Both panels: Listing format -> Brief

  Both panels:
  - Hide dotfiles. Its tiny button near the upper-right corner of a panel is
    hard to locate with broken special chars, so go to a directory that has
    dotfiles so that you see if you managed to click on the correct spot.
    Clicking on either of them hides the dotfiles in both panels.

  Left panel:
  - /etc might be a good choice.
  - Select a file or directory whose highlight looks "nice" when the Copy
    dialog is opened.

  Right panel:
  - /etc/PackageKit, could be any other directory.

  Open the Copy dialog, append something to the "to" field so that it's not in
  "inputunchanged" state.

  Move the focus to the OK button.

Panel - Long
------------

  Left panel: Listing format -> Long.

  Try to Copy ".." so that an error dialog appears.

Editor
------

  Open config.log in this directory. Go to the end, scroll back to fit the
  screen.

  Enable line numbers (Alt+N).

  F7 Search for "result", "Find all" (green highlight in default skin).

  Go to some line(s) and press Alt+K to bookmark (red in default skin).

  Highlight some text (F3 before and after) (cyan in default skin).

  Go with the cursor to after "stat" in "checking for sys/statvfs.h", press
  Esc Tab to get autocomplete suggestions in a box.

Viewer
------

  View a manual page, like mc/doc/man/mc.1

Diff viewer
-----------

  Run

      mcdiff main.c.orig main.c

  Enable line numbers (Alt+N).


Merge the screenshots
=====================

Once the screenshots are created, edit src/js/mc-templates.js and replace the
old screenshots with the newly taken ones. It will be obvious.

Reload the skin browser.

