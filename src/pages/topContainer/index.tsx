import { useState, useEffect } from "react";
import { MoonStar, Sidebar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Box, Flex } from "@chakra-ui/react";
import SideDrawer from "@/components/sideDrawer";

const TopContainer = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Flex
      className=" dark:bg-gray-800 bg-white overflow-hidden"
      h={"100%"}
      justifyContent={"end"}
      gap={4}
      alignItems={"center"}
      paddingX={2}
      paddingRight={4}
    >
      <Box className="cursor-pointer" onClick={toggleTheme}>
        {theme === "light" ? <MoonStar size={18} /> : <Sun size={18} />}
      </Box>
     
      <SideDrawer />
    </Flex>
  );
};

export default TopContainer;
