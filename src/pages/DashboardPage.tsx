import Dashboard from "../components/Dashboard";
import PageTransition from "../components/PageTransition";

interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

export default function DashboardPage({ theme, setTheme }: Props) {
  return (
    <PageTransition>
      <Dashboard theme={theme} setTheme={setTheme} />
    </PageTransition>
  );
}
