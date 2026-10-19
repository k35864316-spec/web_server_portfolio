import { PROFILE as p } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

const ROWS: { label: string; value: string }[] = [
  { label: "이름", value: p.name },
  { label: "소속", value: p.school },
];

export default function About() {
  return (
    <section id="about" style={{ ...S.block, borderBottom: 0, minHeight: "80vh" }}>
      <h2 style={S.h2}>About</h2>
      <p style={{ maxWidth: "38em", margin: "0 0 24px" }}>{p.intro}</p>
      <dl style={S.ledger}>
        {ROWS.map((r) => (
          <div key={r.label} style={{ ...S.ledgerRow, borderBottom: `1px solid ${C.line}` }}>
            <dt style={{ color: C.muted }}>{r.label}</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{r.value}</dd>
          </div>
        ))}
        <div style={S.ledgerRow}>
          <dt style={{ color: C.muted }}>링크</dt>
          <dd style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={S.link}>{l.label}</a>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}
