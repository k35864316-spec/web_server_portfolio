import { PROFILE as p } from "@/lib/profileData";
import { C, S } from "@/lib/theme";

export default function Main() {
  return (
    <section id="main" style={{ ...S.block, paddingTop: "clamp(56px, 10vw, 96px)", minHeight: "60vh" }}>
      <p style={{ margin: "0 0 8px", color: C.muted }}>{p.school}</p>
      <h1 style={{ margin: 0, fontSize: "clamp(44px, 9vw, 72px)", lineHeight: 1.1 }}>{p.name}</h1>
      <p style={{ margin: "16px 0 0", fontSize: 20 }}>{p.tagline}</p>
    </section>
  );
}
