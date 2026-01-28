#!/usr/bin/python3

from PIL import Image

N = 10

GRAY = 0xD0
ALPHA = 0x38

img = Image.new('RGBA', (2 * N, 2 * N))

for y in range(2 * N):
  for x in range(2 * N):

    if (x + y) % N == 0:
      # antialiased edge
      alpha = ALPHA // 2
    else:
      on = ((x + y) // N) % 2  # 0 or 1
      alpha = ALPHA * on       # 0 or ALPHA

    img.putpixel((x, y), (GRAY, GRAY, GRAY, alpha))

img.save('alpha-stripes.png', 'PNG')
