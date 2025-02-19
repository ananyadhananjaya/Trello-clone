import { useState, useEffect } from "react";
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const TopContainer = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-end p-4">
      <Button onClick={toggleTheme} className="p-1">
        {theme === "light" ? <MoonStar /> : <Sun />}
      </Button>
    </div>
  );
};

export default TopContainer;
