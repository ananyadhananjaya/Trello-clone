import { useAuthStore } from "@/store/useAuthStore";
import { supabase } from "@/supabaseClient";
import { Flex } from "@chakra-ui/react";
import { House, LogOut, Settings } from "lucide-react";
import { NavLink } from "react-router";

const SidePanel = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null); // Clear user from state
    }
  };

  return (
    <div
      className="dark:bg-gray-800 bg-white shadow-lg rounded-lg h-full overflow-hidden"
      style={{ width: "62px" }}
    >
      <Flex justify={"space-between"} flexDirection={"column"} h="100%" p={4}>
        <Flex>
          <NavLink to="/dashboard">
            <House size={18} className="cursor-pointer" />
          </NavLink>
        </Flex>
        <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
          <div>
            <NavLink to="/settings">
              <Settings size={18} className="cursor-pointer" />
            </NavLink>
          </div>
          <div>
            <LogOut
              className="cursor-pointer"
              size={18}
              onClick={() => handleLogOut()}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default SidePanel;
