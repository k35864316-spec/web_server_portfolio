import { PROFILE as p } from "@/lib/profileData";
import { countStackUsage, formatPercent } from "@/lib/stackStats";
import { C, S, STACK_COLORS } from "@/lib/theme";

const CHART_H = 200;
const GAP = "clamp(12px, 4vw, 36px)";

export default function Stack() {
  const usage = countStackUsage();
  const max = Math.max(1, ...usage.map((u) => u.percent));

  return (
    <section id="stack" style={{ ...S.block, minHeight: "60vh" }}>
      <h2 style={S.h2}>Stack</h2>
      <dl style={S.ledger}>
        {p.skills.map((s, idx) => (
          <div
            key={s.group}
            style={{ ...S.ledgerRow, borderBottom: idx === p.skills.length - 1 ? 0 : `1px solid ${C.line}` }}
          >
            <dt style={{ color: C.muted }}>{s.group}</dt>
            <dd style={{ margin: 0, fontWeight: 500 }}>{s.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      <h3 style={{ margin: "40px 0 6px", fontSize: 20 }}>Usage</h3>
      <p style={S.sub}>Project에 소개한 프로젝트 {p.projects.length}개에서 쓰인 기술의 비율이에요. 도구(Tools)는 제외했어요.</p>
      <div
        role="img"
        aria-label={`스택 사용 빈도: ${usage.map((u) => `${u.name} ${formatPercent(u.percent)}%`).join(", ")}`}
        style={{ display: "flex", alignItems: "flex-end", gap: GAP, marginTop: 20, paddingBottom: 8, borderBottom: `2px solid ${C.ink}` }}
      >
        {usage.map((u) => (
          <div key={u.name} style={{ flex: "1 1 0", minWidth: 0, maxWidth: 120, textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{formatPercent(u.percent)}%</div>
            <div style={{ height: CHART_H, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div
                style={{
                  width: 36,
                  height: `${(u.percent / max) * 100}%`,
                  background: STACK_COLORS[u.name] ?? C.accent,
                  borderRadius: "4px 4px 0 0",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: GAP, marginTop: 8 }}>
        {usage.map((u) => (
          <div key={u.name} style={{ flex: "1 1 0", minWidth: 0, maxWidth: 120, textAlign: "center", fontSize: 14, overflowWrap: "anywhere" }}>
            {u.name}
          </div>
        ))}
      </div>
    </section>
  );
}
