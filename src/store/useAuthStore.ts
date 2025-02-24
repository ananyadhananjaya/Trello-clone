import { create } from "zustand";
import { supabase } from "../supabaseClient";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));


supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({ user: session?.user || null });
});
