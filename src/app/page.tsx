import Sidebar from "@/components/Sidebar";
import { PROFILE as p } from "@/lib/profileData";
import { countStackUsage } from "@/lib/stackStats";
import { C, S } from "@/lib/theme";

export default function Home() {
  const usage = countStackUsage();
  const max = Math.max(1, ...usage.map((u) => u.count));
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
          <p style={S.sub}>활동에 적은 프로젝트 {p.projects.length}개에서 쓰인 횟수예요. 도구(Tools)는 제외했어요.</p>
          <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 10 }}>
            {usage.map((u) => (
              <li key={u.name} style={{ display: "grid", gridTemplateColumns: "minmax(88px, 120px) minmax(0, 1fr) 44px", alignItems: "center", gap: 12 }}>
                <span>{u.name}</span>
                <span style={{ background: C.line, borderRadius: 4, height: 14 }}>
                  <span style={{ display: "block", height: "100%", borderRadius: 4, background: C.accent, width: `${(u.count / max) * 100}%` }} />
                </span>
                <span style={{ color: C.muted, textAlign: "right" }}>{u.count}회</span>
              </li>
            ))}
          </ul>
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
