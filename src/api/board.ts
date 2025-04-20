import { supabase } from "@/supabaseClient";

export async function createBoard(name: string, description?: string) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("boards")
    .insert([{ 
      name, 
      description, 
      created_by: user.id 
    }]);

  if (error) {
    console.error("Error creating board:", error.message);
    throw new Error(error.message);
  }

  return data;
}

// export async function fetchBoards() {
//   const { data: { user }, error: userError } = await supabase.auth.getUser();

//   if (userError || !user) {
//     throw new Error("User not logged in");
//   }

//   const { data, error } = await supabase
//     .from("boards")
//     .select("*")



//   if (error) {
//     console.error("Error fetching boards:", error.message);
//     throw new Error(error.message);
//   }

//   return data;
// }