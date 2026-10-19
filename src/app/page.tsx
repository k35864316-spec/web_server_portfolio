import About from "@/components/About";
import Main from "@/components/Main";
import Project from "@/components/Project";
import Sidebar from "@/components/Sidebar";
import Stack from "@/components/Stack";
import { PROFILE } from "@/lib/profileData";
import { S } from "@/lib/theme";

export default function Home() {
  return (
    <>
      <Sidebar name={PROFILE.name} />
      <main style={S.content}>
        <Main />
        <Stack />
        <Project />
        <About />
      </main>
    </>
  );
}
