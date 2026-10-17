"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "main", label: "메인" },
  { id: "skills", label: "기술 스택" },
  { id: "activities", label: "활동" },
];

export default function Sidebar({ name }: { name: string }) {
  const [active, setActive] = useState("main");

  useEffect(() => {
    // 화면 위쪽 35% 지점을 지난 마지막 섹션을 현재 위치로 본다.
    function update() {
      const line = window.innerHeight * 0.35;
      let cur = ITEMS[0].id;
      for (const i of ITEMS) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= line) cur = i.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = ITEMS[ITEMS.length - 1].id;
      setActive(cur);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function go(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside className="side">
      <div className="side-name">{name}</div>
      <nav aria-label="페이지 이동">
        {ITEMS.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => go(i.id)}
            className={active === i.id ? "side-btn on" : "side-btn"}
            aria-current={active === i.id ? "true" : undefined}
          >
            {i.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
