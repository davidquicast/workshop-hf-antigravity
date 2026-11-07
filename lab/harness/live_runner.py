"""Minimal shared paths for selected runners; legacy poster runner omitted."""
from pathlib import Path
import os
LAB_ROOT=Path(__file__).resolve().parents[1]
AGY=os.environ.get("AGY_BIN",os.path.expanduser("~/.gemini/bin/agy"))
