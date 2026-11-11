#!/usr/bin/env bash
# Run from any directory. Keeps the exact runtime and dependencies out of Git.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node_version="$(tr -d '[:space:]' < "$repo_root/.nvmrc")"
case "$(uname -s)/$(uname -m)" in
  Linux/x86_64) node_arch=x64 ;;
  Linux/aarch64|Linux/arm64) node_arch=arm64 ;;
  *) echo 'This Cloud installer supports Linux x64 and arm64.' >&2; exit 1 ;;
esac
runtime_root="$repo_root/.cache/portfolio-cloud"
runtime="$runtime_root/node-v$node_version-linux-$node_arch"
mkdir -p "$runtime_root"
if [[ ! -x "$runtime/bin/node" ]]; then
  archive="node-v$node_version-linux-$node_arch.tar.xz"
  download_dir="$(mktemp -d "$runtime_root/download.XXXXXX")"
  trap 'rm -rf -- "$download_dir"' EXIT
  curl --fail --silent --show-error --location "https://nodejs.org/dist/v$node_version/SHASUMS256.txt" -o "$download_dir/SHASUMS256.txt"
  curl --fail --silent --show-error --location "https://nodejs.org/dist/v$node_version/$archive" -o "$download_dir/$archive"
  (cd "$download_dir" && awk -v file="$archive" '$2 == file' SHASUMS256.txt | sha256sum --check --status)
  tar -xJf "$download_dir/$archive" -C "$runtime_root"
fi
ln -sfn "$(basename "$runtime")" "$runtime_root/node"
export PATH="$runtime_root/node/bin:$PATH"
[[ "$(node --version)" == "v$node_version" ]]
node --version
npm --version

cd "$repo_root/docs/redesign/prototypes/space-gallery"
npm ci
npm test
npm run build
npm run check:build
cd "$repo_root"
node tests/site.test.mjs
