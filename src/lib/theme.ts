import type { CSSProperties } from "react";

/** 색과 공통 스타일. CSS 파일 대신 TypeScript 객체로 관리한다. */
export const C = {
  bg: "#f4f6f8",
  panel: "#ffffff",
  ink: "#14202e",
  muted: "#5d6b7a",
  line: "#dde3e9",
  bar: "#14202e",
  barInk: "#c9d3de",
  accent: "#3d7bff",
} as const;

/** 기술별 대표 색 (그래프 막대용). 목록에 없는 기술은 기본 강조색을 쓴다. */
export const STACK_COLORS: Record<string, string> = {
  "Next.js": "#111111",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  MongoDB: "#47A248",
  HTML: "#E34F26",
  CSS: "#1572B6",
  JS: "#F7DF1E",
  Python: "#3776AB",
  C: "#5C6BC0",
};

export const FONT =
  'system-ui, -apple-system, "Segoe UI", "Malgun Gothic", "Noto Sans KR", sans-serif';

export const NAV_HEIGHT = 60;

export const S: Record<string, CSSProperties> = {
  body: { margin: 0, background: C.bg, color: C.ink, fontFamily: FONT, lineHeight: 1.7 },
  content: { maxWidth: 920, margin: "0 auto", padding: "0 clamp(16px, 4vw, 32px)" },
  block: { scrollMarginTop: NAV_HEIGHT, padding: "clamp(48px, 8vw, 72px) 0 clamp(36px, 6vw, 56px)", borderBottom: `1px solid ${C.line}` },
  h2: { margin: "0 0 24px", fontSize: 28 },
  ledger: { margin: 0, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10 },
  ledgerRow: { display: "grid", gridTemplateColumns: "minmax(84px, 130px) minmax(0, 1fr)", gap: 16, padding: "14px 18px" },
  card: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "22px 24px", marginBottom: 20 },
  sub: { color: C.muted, fontSize: 14, margin: "6px 0" },
  link: { color: C.accent, fontWeight: 600 },
};
