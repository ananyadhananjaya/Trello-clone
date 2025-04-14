import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Box } from "@chakra-ui/react";
import { Bell, Sidebar } from "lucide-react";

const SideDrawer = () => {
  return (
    <DrawerRoot size={"sm"}>
      <DrawerTrigger asChild>
        <Box className="cursor-pointer">
          <Bell size={24} />
        </Box>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Project Overview</DrawerTitle>
          <DrawerCloseTrigger />
        </DrawerHeader>
        <DrawerBody>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default SideDrawer;
