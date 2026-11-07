"""Local slide preview: serve each rebuilt version without browser caching."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--bind", default="0.0.0.0")
    parser.add_argument("--directory", type=Path,
                        default=Path(__file__).resolve().parents[1] / "dist")
    args = parser.parse_args()
    handler = partial(PreviewHandler, directory=str(args.directory.resolve()))
    with ThreadingHTTPServer((args.bind, args.port), handler) as server:
        print(f"Slide preview: http://localhost:{args.port} · cache disabled", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
