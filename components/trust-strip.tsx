const brands = ['logoi psum', 'logoi psum', 'LOGOIPSUM', 'logoipsum', 'logoipsum'];

export function TrustStrip() {
  return (
    <section className="trust shell" id="work" tabIndex={-1}>
      <h2 className="sr-only">Our work</h2>
      <p>Trusted by forward-thinking teams</p>
      <ul aria-label="Partner marks">
        {brands.map((brand, index) => <li aria-hidden="true" key={`${brand}-${index}`}><span>✦</span>{brand}</li>)}
      </ul>
    </section>
  );
}
