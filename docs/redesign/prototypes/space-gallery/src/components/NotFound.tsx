export function NotFound() {
  return <main className="not-found shell" id="main" aria-labelledby="missing-title">
    <div className="missing-orbit" aria-hidden="true"><span>404</span><i /></div>
    <p className="eyebrow">A little off course</p>
    <h1 id="missing-title">Lost in space<span>.</span></h1>
    <p className="missing-copy">This page couldn’t be found. The link may have changed, or the address might have a typo.</p>
    <div className="missing-actions"><a className="button button-light" href="/">Return home <span aria-hidden="true">↗</span></a>
      <a className="button button-quiet" href="/#work">Explore my work</a></div>
    <a className="text-link" href="/archive.html">Browse the project archive <span aria-hidden="true">↗</span></a>
  </main>;
}
