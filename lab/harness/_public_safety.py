"""Explicit opt-in for runs that consume an agent account or contact a lab Space."""
import os,sys
def require_opt_in():
    if any(arg in sys.argv for arg in ["--help","-h","--dry"]):return
    if os.environ.get("DEVFEST_LAB_EXECUTE")!="1":
        raise SystemExit("No experiment started. Read docs/REPRODUCIR.md, then explicitly set DEVFEST_LAB_EXECUTE=1 in an isolated synthetic lab.")
