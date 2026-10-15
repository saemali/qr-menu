#!/usr/bin/env python3
"""Generate qr.png + qr.svg for a demo folder. Usage: python3 tools/build_qr.py tiffin-garden"""
import sys
from pathlib import Path
import segno
ROOT = Path(__file__).resolve().parents[1]
slug = sys.argv[1] if len(sys.argv) > 1 else 'tiffin-garden'
url = f'https://saemali.github.io/qr-menu/{slug}/'
dest = ROOT / slug
dest.mkdir(parents=True, exist_ok=True)
q = segno.make(url, error='m')
q.save(dest / 'qr.png', scale=8, border=2)
q.save(dest / 'qr.svg', scale=8, border=2)
print(url, '->', dest / 'qr.png')
