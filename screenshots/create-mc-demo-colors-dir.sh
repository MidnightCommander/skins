#!/bin/sh

set -e

mkdir mc-demo-colors-dir
cd mc-demo-colors-dir

ln -s test-dir link-to-dir
mkdir test-dir
touch archive.tar.gz
ln -s nowhere broken-link
touch core.123456
sudo mknod device-file c 1 3
echo '#!/bin/sh' > executable; chmod +x executable
ln core.123456 hardlink
touch image.png
touch marked-file-1
touch marked-file-2
touch media-file.ogg
ln -s text.txt normal-link
mknod pipe-file p
touch source.c
touch sqlite.db
touch temp-file.tmp
touch text.txt
touch this-is-a-file-with-a-very-long-name.txt
touch unhandled-file-1
touch unhandled-file-2
