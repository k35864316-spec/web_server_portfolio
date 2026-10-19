import type { ProfileData } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

export default function Main({ p }: { p: ProfileData }) {
  const lab = p.projects[0];
  return (
    <section id="main" style={{ ...S.block, paddingTop: "clamp(64px, 12vw, 120px)", minHeight: "70vh" }}>
      <p
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          margin: "0 0 24px",
          padding: "5px 14px",
          borderRadius: 999,
          border: `1px solid ${C.line}`,
          background: C.panel,
          fontSize: 14,
          color: C.muted,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.ok }} />
        웹서버보안프로그래밍 수업 프로젝트 · {lab.status}
      </p>
      <h1 style={{ margin: 0, fontSize: "clamp(40px, 8vw, 68px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
        안녕하세요,
        <br />
        {p.name}입니다.
      </h1>
      <p style={{ margin: "20px 0 8px", fontSize: 20, maxWidth: "30em" }}>{p.tagline}</p>
      <p style={{ margin: "0 0 32px", color: C.muted }}>{p.school}</p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: 0 }}>
        <a href="#project" style={S.btnPrimary}>프로젝트 보기</a>
        <a href={p.github} target="_blank" rel="noreferrer" style={S.btn}>GitHub ↗</a>
      </p>
    </section>
  );
}
