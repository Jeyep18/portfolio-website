"""Serve the isolated portfolio study on loopback."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


class PreviewHandler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        error_page = Path(self.directory) / "404.html"
        if code != 404 or not error_page.is_file():
            return super().send_error(code, message, explain)
        content = error_page.read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(content)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        if parse_qs(urlsplit(self.path).query).get("scripts") == ["off"]:
            self.send_header("Content-Security-Policy", "script-src 'none'")
        super().end_headers()


if __name__ == "__main__":
    build = Path(__file__).resolve().parent / "dist"
    if not (build / "index.html").exists():
        raise SystemExit("Build the React preview first with npm run build in this folder.")
    directory = str(build)
    handler = partial(PreviewHandler, directory=directory)
    print("Portfolio preview: http://127.0.0.1:8769/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8769), handler).serve_forever()
