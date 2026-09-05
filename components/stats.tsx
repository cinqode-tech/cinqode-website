const stats = [
  ['120+', 'Projects Completed'], ['98%', 'Client Satisfaction'], ['5+', 'Years Experience'], ['24/7', 'Support Available'],
];

export function Stats() {
  return (
    <section className="stats section shell" id="about" tabIndex={-1}>
      <h2 className="sr-only">Our impact</h2>
      <dl>
        {stats.slice(0, 2).map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}
        <div className="stat-mark" aria-hidden="true"><span>C</span></div>
        {stats.slice(2).map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}
      </dl>
    </section>
  );
}
