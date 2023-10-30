import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Footer, Header, MainBoard, Sidebar } from "./components";
import { currentTheme } from "./redux/themeSlice";

export default function App() {
  const theme = useSelector(currentTheme);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="app__main">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainBoard />
        <Footer />
      </div>
    </div>
  );
}
