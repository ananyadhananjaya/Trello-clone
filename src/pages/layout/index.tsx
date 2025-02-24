import SidePanel from "@/components/pageComps/sidePanel";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <Flex h={"100%"} w={"100%"}>
      <SidePanel />
      <Box p={1}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
