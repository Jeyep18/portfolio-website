"""Serve only this design study, on loopback, with an optional script-free view."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


class StudyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        if parse_qs(urlsplit(self.path).query).get("scripts") == ["off"]:
            self.send_header("Content-Security-Policy", "script-src 'none'")
        super().end_headers()


if __name__ == "__main__":
    handler = partial(StudyHandler, directory=str(Path(__file__).resolve().parent))
    print("Portfolio design study: http://127.0.0.1:8768/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8768), handler).serve_forever()
