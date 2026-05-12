import { useThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Parameters<typeof setTheme>[0])}
      className="px-4 py-3 rounded-2xl border border-violet-200 bg-white shadow"
    >
      <option value="lavender">💜 Lavender</option>
      <option value="pink">🌸 Pink</option>
      <option value="blue">🌊 Blue</option>
      <option value="dark">🌙 Dark</option>
    </select>
  );
}
