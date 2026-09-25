#!/bin/bash
# Installs a macOS launchd LaunchAgent that runs
# `node scraper/daily-update.js` once a day, on its own, without
# Claude Code — see the "Daily automatic updates" section of the
# README for what that script actually does.
#
# Runs at 06:00 every day by default — early enough to have fresh
# data before anyone checks in the morning, and off-peak for the
# three stores (the same "be polite" reasoning the scraper itself
# already follows). To use a different time, edit the Hour/Minute
# values a little further down in this script, or edit them directly
# in the installed plist afterwards and reload it (see the final
# instructions this script prints).
#
# A LaunchAgent (not a LaunchDaemon) on purpose — this only needs to
# run while you're logged in, and installing it doesn't need sudo/root,
# unlike a system-wide LaunchDaemon under /Library/LaunchDaemons would.
#
# Run with: bash scripts/install-daily-update.sh
# Uninstall: launchctl unload ~/Library/LaunchAgents/ee.minu.daily-update.plist
#            rm ~/Library/LaunchAgents/ee.minu.daily-update.plist

set -euo pipefail

HOUR=6
MINUTE=0

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE_PATH="$(command -v node)"
LABEL="ee.minu.daily-update"
PLIST_PATH="$HOME/Library/LaunchAgents/${LABEL}.plist"
LOG_DIR="$HOME/Library/Logs/minu"

if [ -z "$NODE_PATH" ]; then
  echo "Could not find node on PATH — install it first." >&2
  exit 1
fi

mkdir -p "$HOME/Library/LaunchAgents" "$LOG_DIR"

cat > "$PLIST_PATH" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>${NODE_PATH}</string>
    <string>${PROJECT_ROOT}/scraper/daily-update.js</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${PROJECT_ROOT}</string>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>${HOUR}</integer>
    <key>Minute</key>
    <integer>${MINUTE}</integer>
  </dict>
  <!-- launchd-level stdout/stderr — separate from the script's own
       data/logs/YYYY-MM-DD.txt, which only exists once a run has
       actually started; this catches anything before that too. -->
  <key>StandardOutPath</key>
  <string>${LOG_DIR}/daily-update.out.log</string>
  <key>StandardErrorPath</key>
  <string>${LOG_DIR}/daily-update.err.log</string>
  <!-- launchd jobs don't inherit an interactive shell's PATH — without
       this, `git` (used by the script's own commit step) isn't found. -->
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <!-- Only run on the schedule above, never immediately when loaded —
       this is being installed right after a manual run already
       happened today, so an immediate extra run isn't wanted. -->
  <key>RunAtLoad</key>
  <false/>
</dict>
</plist>
PLIST

# Reload cleanly if it's already installed (e.g. re-running this after
# changing HOUR/MINUTE above).
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo "Installed: runs daily at $(printf '%02d:%02d' "$HOUR" "$MINUTE") — node scraper/daily-update.js"
echo "Plist:            $PLIST_PATH"
echo "launchd logs:      $LOG_DIR/daily-update.out.log / .err.log"
echo "Script's own logs: data/logs/YYYY-MM-DD.txt (one per successful run)"
echo ""
echo "To change the time: edit HOUR/MINUTE at the top of this script and re-run it,"
echo "or edit the Hour/Minute in the plist directly, then:"
echo "  launchctl unload $PLIST_PATH && launchctl load $PLIST_PATH"
echo ""
echo "To run it once right now (outside the schedule): launchctl start ${LABEL}"
echo "To uninstall: launchctl unload $PLIST_PATH && rm $PLIST_PATH"
