import Sidebar from "@/components/Sidebar";
import { PROFILE as p } from "@/lib/profileData";
import { countStackUsage, formatPercent } from "@/lib/stackStats";
import { C, S, STACK_COLORS } from "@/lib/theme";

export default function Home() {
  const usage = countStackUsage();
  const max = Math.max(1, ...usage.map((u) => u.percent));
  const CHART_H = 200;
  return (
    <>
      <Sidebar name={p.name} />
      <main style={S.content}>
        <section id="main" style={{ ...S.block, paddingTop: "clamp(56px, 10vw, 96px)", minHeight: "60vh" }}>
          <p style={{ margin: "0 0 8px", color: C.muted }}>{p.school}</p>
          <h1 style={{ margin: 0, fontSize: "clamp(44px, 9vw, 72px)", lineHeight: 1.1 }}>{p.name}</h1>
          <p style={{ margin: "16px 0 24px", fontSize: 20 }}>{p.tagline}</p>
          <p style={{ maxWidth: "38em", margin: 0 }}>{p.intro}</p>
        </section>

        <section id="skills" style={{ ...S.block, minHeight: "60vh" }}>
          <h2 style={S.h2}>기술 스택</h2>
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

          <h3 style={{ margin: "40px 0 6px", fontSize: 20 }}>기술 스택 사용 빈도</h3>
          <p style={S.sub}>활동에 적은 프로젝트 {p.projects.length}개에서 쓰인 기술의 비율이에요. 도구(Tools)는 제외했어요.</p>
          <div
            role="img"
            aria-label={`기술 스택 사용 빈도: ${usage.map((u) => `${u.name} ${formatPercent(u.percent)}%`).join(", ")}`}
            style={{ display: "flex", alignItems: "flex-end", gap: "clamp(12px, 4vw, 36px)", marginTop: 20, paddingBottom: 8, borderBottom: `2px solid ${C.ink}` }}
          >
            {usage.map((u) => (
              <div key={u.name} style={{ flex: "1 1 0", minWidth: 0, maxWidth: 120, textAlign: "center" }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>{formatPercent(u.percent)}%</div>
                <div style={{ height: CHART_H, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                  <div style={{ width: 36, margin: "0 auto", height: `${(u.percent / max) * 100}%`, background: STACK_COLORS[u.name] ?? C.accent, borderRadius: "4px 4px 0 0" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "clamp(12px, 4vw, 36px)", marginTop: 8 }}>
            {usage.map((u) => (
              <div key={u.name} style={{ flex: "1 1 0", minWidth: 0, maxWidth: 120, textAlign: "center", fontSize: 14, overflowWrap: "anywhere" }}>
                {u.name}
              </div>
            ))}
          </div>
        </section>

        <section id="activities" style={{ ...S.block, borderBottom: 0, minHeight: "80vh" }}>
          <h2 style={S.h2}>활동</h2>
          {p.projects.map((pr) => (
            <article key={pr.title} style={S.card}>
              <h3 style={{ margin: 0, fontSize: 20 }}>{pr.title}</h3>
              <p style={S.sub}>{pr.role} · {pr.period}</p>
              <p style={{ margin: "6px 0" }}>{pr.summary}</p>
              <ul style={{ margin: "12px 0", paddingLeft: 20 }}>
                {pr.points.map((x) => (
                  <li key={x.text} style={x.done ? undefined : { color: C.muted }}>
                    {x.text}
                    {!x.done && " (구현 예정)"}
                  </li>
                ))}
              </ul>
              <p style={S.sub}>사용 기술: {pr.stack.join(", ")}</p>
              <p style={S.sub}>사용 도구: {pr.tools.join(", ")}</p>
              <p style={{ display: "flex", gap: 18, margin: "6px 0 0" }}>
                {pr.repo && <a href={pr.repo} target="_blank" rel="noreferrer" style={S.link}>저장소</a>}
                {pr.demo && <a href={pr.demo} target="_blank" rel="noreferrer" style={S.link}>배포 주소</a>}
              </p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
