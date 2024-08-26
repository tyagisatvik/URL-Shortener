import supabase, {supabaseUrl} from "./supabase";

// this function verifies whether user exist in my database
export async function login({email, password}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}


//signup api
export async function signup({name, email, password, profile_pic}) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const {error: storageError} = await supabase.storage//api call to database
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  //create an entry in database
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}


//fetching current user session
export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  

  if (error) throw new Error(error.message);
  return session.session?.user;
}

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
