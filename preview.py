"""Loopback-only review server. The scripts=off route blocks scripts via CSP."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

class ReviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        if parse_qs(urlsplit(self.path).query).get("scripts") == ["off"]:
            self.send_header("Content-Security-Policy", "script-src 'none'")
        super().end_headers()

if __name__ == "__main__":
    handler = partial(ReviewHandler, directory=str(Path(__file__).resolve().parent))
    print("Portfolio local review: http://127.0.0.1:8767/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8767), handler).serve_forever()
