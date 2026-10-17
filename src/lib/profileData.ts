/**
 * 포트폴리오에 표시되는 내용입니다. 이 파일만 고치고 배포하면 화면과 MongoDB 의 내용이 함께 바뀝니다.
 * (배포 후 첫 접속 때 MongoDB 의 profile 문서가 이 내용으로 갱신됩니다)
 */
export type Project = {
  title: string;
  period: string;
  summary: string;
  role: string;
  stack: string[];
  points: string[];
  repo?: string;
  demo?: string;
};

export type ProfileData = {
  name: string;
  tagline: string;
  intro: string;
  school: string;
  github: string;
  skills: { group: string; items: string[] }[];
  projects: Project[];
  links: { label: string; url: string }[];
};

export const PROFILE: ProfileData = {
  name: "김명준",
  tagline: "정보보호를 공부하는 대학생 · 웹 보안에 관심이 있습니다",
  intro:
    "중부대학교 정보보호학과 2학년입니다. 웹서버보안프로그래밍 수업에서 팀원들과 로그인 기능이 있는 게시판을 만들며 " +
    "Next.js, TypeScript, MongoDB로 웹 서비스를 개발하고 배포하는 과정을 배우고 있습니다. " +
    "기능을 만든 뒤에는 어떤 공격에 취약한지 확인하고 방어하는 방식으로 공부합니다.",
  school: "중부대학교 정보보호학과 · 2학년 재학",
  github: "https://github.com/k35864316-spec",
  skills: [
    { group: "Web", items: ["Next.js", "React", "TypeScript"] },
    { group: "Database", items: ["MongoDB", "Mongoose", "MongoDB Atlas"] },
    { group: "Language", items: ["Python (기초)", "C (기초)"] },
    { group: "Tools", items: ["Git / GitHub", "VS Code", "Vercel"] },
  ],
  projects: [
    {
      title: "SafeBoard (세이프보드)",
      period: "2026.09 ~ 진행 중",
      summary: "로그인한 사용자만 이용할 수 있는 게시판입니다. 웹 보안 기능을 기능마다 하나씩 적용해 가는 팀 프로젝트입니다.",
      role: "3인 팀 프로젝트 (웹서버보안프로그래밍)",
      stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Vercel"],
      points: [
        "회원가입·로그인, 서버 세션(HttpOnly 쿠키), bcrypt 비밀번호 해시",
        "게시글 작성·수정·삭제, 검색, 페이지 나누기, 조회수, 비밀글, 댓글",
        "작성자·관리자 권한 검사(접근 제어), 로그인 실패 5회 시 5분 잠금",
        "입력값 검증·인젝션 방어, XSS 방어, CSRF 방어는 구현 예정",
      ],
      repo: "https://github.com/k35864316-spec/safeboard",
      demo: "https://safeboard-hazel.vercel.app/",
    },
    {
      title: "개인 포트폴리오 홈페이지",
      period: "2026.10",
      summary: "지금 보고 계신 이 사이트입니다. 소개 내용을 MongoDB에 저장해 불러오고, 방명록을 남길 수 있습니다.",
      role: "개인 프로젝트",
      stack: ["Next.js", "TypeScript", "MongoDB", "Mongoose", "Vercel"],
      points: [
        "소개·기술·프로젝트 정보를 MongoDB 에서 읽어 서버에서 렌더링",
        "방명록 작성·조회 API (입력값 길이 검사, 화면에는 텍스트로만 출력)",
        "DB 에 연결할 수 없을 때도 기본 내용으로 화면이 열리도록 대비",
      ],
      repo: "https://github.com/k35864316-spec/portfolio",
    },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/k35864316-spec" },
    { label: "SafeBoard 저장소", url: "https://github.com/k35864316-spec/safeboard" },
    { label: "SafeBoard 배포 주소", url: "https://safeboard-hazel.vercel.app/" },
  ],
};
