# Ensure the service root is on sys.path even if pytest changes CWD
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]  # .../services/ai
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))
