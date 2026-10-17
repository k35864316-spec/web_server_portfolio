import Sidebar from "@/components/Sidebar";
import { PROFILE as p } from "@/lib/profileData";

export default function Home() {
  return (
    <div className="shell">
      <Sidebar name={p.name} />
      <main className="content">
        <section id="main" className="block hero">
          <p className="school">{p.school}</p>
          <h1>{p.name}</h1>
          <p className="tagline">{p.tagline}</p>
          <p className="intro">{p.intro}</p>
        </section>

        <section id="skills" className="block">
          <h2>기술 스택</h2>
          <dl className="ledger">
            {p.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="activities" className="block">
          <h2>활동</h2>
          {p.projects.map((pr) => (
            <article key={pr.title} className="activity">
              <h3>{pr.title}</h3>
              <p className="sub">{pr.role} · {pr.period}</p>
              <p>{pr.summary}</p>
              <ul>
                {pr.points.map((x) => (
                  <li key={x.text} className={x.done ? "" : "todo"}>
                    {x.text}
                    {!x.done && <span className="pending"> (구현 예정)</span>}
                  </li>
                ))}
              </ul>
              <p className="sub">사용 기술: {pr.stack.join(", ")}</p>
              <p className="links">
                {pr.repo && <a href={pr.repo} target="_blank" rel="noreferrer">저장소</a>}
                {pr.demo && <a href={pr.demo} target="_blank" rel="noreferrer">배포 주소</a>}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
