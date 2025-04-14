import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabaseClient";
import { Box, Flex } from "@chakra-ui/react";
import { AlignStartHorizontal, House, LogOut, Settings } from "lucide-react";
import { NavLink } from "react-router";

const SidePanel = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogOut = async () => {
    await supabase.auth.refreshSession(); // Refresh before logging out
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null); // Clear user from state
    }
  };

  return (
    <div
      className="dark:bg-gray-800 bg-white border dark:border-none overflow-hidden"
      style={{ width: "62px" }}
    >
      <Flex
        justify={"space-between"}
        flexDirection={"column"}
        h="100%"
        paddingY={2}
      >
        <Flex flexDirection={"column"} alignItems={"center"} gap={4} p={2}>
          <div style={{ height: "36px" }}></div>
          <Flex flexDirection={"column"} gap={6}>
            <NavLink to="/dashboard">
              <House size={24} className="cursor-pointer" />
            </NavLink>
            <NavLink to={"/boards"}>
              <AlignStartHorizontal size={24} className="cursor-pointer" />
            </NavLink>
          </Flex>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"center"} gap={4} p={2}>
          <div
            style={{
              borderBottom: "1px solid #e0e0e0",
              width: "100%",
              height: "1px",
            }}
          />
          <div>
            <NavLink to="/settings">
              <Settings size={24} className="cursor-pointer" />
            </NavLink>
          </div>
          <div>
            <LogOut
              className="cursor-pointer"
              size={24}
              onClick={() => handleLogOut()}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default SidePanel;
