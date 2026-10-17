import Guestbook from "@/components/Guestbook";
import { getProfile } from "@/lib/profile";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: p, fromDb } = await getProfile();

  return (
    <main className="sheet">
      <table className="meta">
        <tbody>
          <tr>
            <th>작성자</th>
            <td>{p.name}</td>
            <th>소속</th>
            <td>{p.school}</td>
          </tr>
          <tr>
            <th>용도</th>
            <td>웹서버보안프로그래밍 중간 발표</td>
            <th>관심 분야</th>
            <td>웹 보안, 웹 서비스 개발</td>
          </tr>
        </tbody>
      </table>

      <header className="masthead">
        <h1 className="name">{p.name}</h1>
        <p className="tagline">{p.tagline}</p>
        <span className="stamp" aria-hidden="true">검토 중</span>
      </header>

      <section className="row" id="about">
        <h2>소개</h2>
        <div className="body">
          <p className="lead">{p.intro}</p>
        </div>
      </section>

      <section className="row" id="skills">
        <h2>사용 기술</h2>
        <div className="body">
          <dl className="ledger">
            {p.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="row" id="projects">
        <h2>프로젝트</h2>
        <div className="body">
          {p.projects.map((pr) => (
            <article key={pr.title} className="project">
              <h3>{pr.title}</h3>
              <p className="sub">{pr.role} · {pr.period}</p>
              <p>{pr.summary}</p>
              <ul className="checks">
                {pr.points.map((x) => (
                  <li key={x.text}>
                    <span className={x.done ? "tag ok" : "tag todo"}>{x.done ? "적용" : "구현 예정"}</span>
                    <span>{x.text}</span>
                  </li>
                ))}
              </ul>
              <p className="stack">사용 기술: {pr.stack.join(", ")}</p>
              <p className="plinks">
                {pr.repo && <a href={pr.repo} target="_blank" rel="noreferrer">저장소 보기</a>}
                {pr.demo && <a href={pr.demo} target="_blank" rel="noreferrer">배포 사이트 열기</a>}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="row" id="guestbook">
        <h2>방명록</h2>
        <div className="body">
          <Guestbook />
        </div>
      </section>

      <footer className="foot">
        <p className="plinks">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          ))}
        </p>
        <p className="muted">{fromDb ? "MongoDB에서 불러온 내용입니다." : "MongoDB에 연결하지 못해 기본 내용을 보여 주고 있습니다."}</p>
      </footer>
    </main>
  );
}
