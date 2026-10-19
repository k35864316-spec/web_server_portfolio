import { PROFILE as p } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

export default function Project() {
  return (
    <section id="project" style={{ ...S.block, minHeight: "60vh" }}>
      <h2 style={S.h2}>Project</h2>
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
  );
}
