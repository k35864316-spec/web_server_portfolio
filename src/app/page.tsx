import Guestbook from "@/components/Guestbook";
import { getProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: p, fromDb } = await getProfile();

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand">{p.name}</a>
          <nav>
            <a href="#about">소개</a>
            <a href="#skills">기술</a>
            <a href="#projects">프로젝트</a>
            <a href="#guestbook">방명록</a>
          </nav>
        </div>
      </header>

      <main className="wrap" id="top">
        <section className="hero">
          <p className="kicker">{p.school}</p>
          <h1>안녕하세요, <span className="accent">{p.name}</span>입니다.</h1>
          <p className="tagline">{p.tagline}</p>
          <div className="actions">
            <a className="btn primary" href="#projects">프로젝트 보기</a>
            <a className="btn" href={p.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <section id="about" className="sec">
          <h2>소개</h2>
          <p className="lead">{p.intro}</p>
        </section>

        <section id="skills" className="sec">
          <h2>기술</h2>
          <div className="skills">
            {p.skills.map((s) => (
              <div key={s.group} className="skill-card">
                <h3>{s.group}</h3>
                <div className="chips">
                  {s.items.map((i) => <span key={i} className="chip">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="sec">
          <h2>프로젝트</h2>
          <div className="projects">
            {p.projects.map((pr) => (
              <article key={pr.title} className="project">
                <div className="project-head">
                  <h3>{pr.title}</h3>
                  <span className="muted">{pr.period}</span>
                </div>
                <p className="muted">{pr.role}</p>
                <p>{pr.summary}</p>
                <ul>
                  {pr.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <div className="chips">
                  {pr.stack.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="actions">
                  {pr.repo && <a className="btn" href={pr.repo} target="_blank" rel="noreferrer">저장소</a>}
                  {pr.demo && <a className="btn primary" href={pr.demo} target="_blank" rel="noreferrer">배포 주소</a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="guestbook" className="sec">
          <h2>방명록</h2>
          <Guestbook />
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <div className="links">
            {p.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
          <p className="muted">Next.js · TypeScript · MongoDB · {fromDb ? "MongoDB 연결됨" : "기본 데이터 표시 중 (DB 미연결)"}</p>
        </div>
      </footer>
    </>
  );
}
