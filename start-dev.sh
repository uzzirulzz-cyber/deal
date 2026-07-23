#!/usr/bin/env bash
# Daemonized dev server starter — survives parent shell exit via double-fork.
cd /home/z/my-project

# Clear any stale env from the container, then load the real .env
unset DATABASE_URL DIRECT_URL
set -a
. ./.env
set +a

# Double-fork + setsid to fully detach from the Bash tool's process group
exec setsid bash -c '
  cd /home/z/my-project
  exec node_modules/.bin/next dev -p 3000 > dev.log 2>&1
' </dev/null >/dev/null 2>&1 &
