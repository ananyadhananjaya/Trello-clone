import SidePanel from "@/components/sidePanel";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";
import TopContainer from "../topContainer";

const Layout = () => {
  return (
    <Flex h={"100%"} w={"100%"}>
      <SidePanel />
      <Box w={"100%"} h={"100%"} overflowY="auto">
        <div className="flex-none w-full" style={{ height: "50px" }}>
          <TopContainer />
        </div>
        <Box p={1}><Outlet /></Box>
      </Box>
    </Flex>
  );
};

export default Layout;
