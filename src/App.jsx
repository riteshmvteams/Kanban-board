import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Footer, Header, MainBoard, Sidebar } from "./components";
import { currentTheme } from "./redux/themeSlice";

export default function App() {
  const theme = useSelector(currentTheme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Sidebar />
      <div className="app__main">
        <Header />
        <MainBoard />
        <Footer />
      </div>
    </div>
  );
}
