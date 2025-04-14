import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Box, Card, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { PasswordInput } from "@/components/ui/password-input";

type UserRole = "admin" | "user" | "moderator";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .finally(() => {
        setLoading(false);
      });

    if (error) {
      setError(error.message);
      return; // Early return if sign-in fails
    }

    const { data: profileData, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id);

    if (fetchError) {
      console.error(fetchError.message);
    } else {
      localStorage.setItem("role", profileData[0].role || "");
    }
  };

  const handleCreateAccount = () => {};

  return (
    <Flex justifyContent={"center"} alignItems={"center"} h="full">
      <Card.Root maxW={"sm"} p={4}>
        <Card.Header>
          <Card.Title fontSize={"large"} fontWeight={"medium"}>
            Log In
          </Card.Title>
          <Card.Description>
            Fill in the form below to access the application
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap={4} w={"full"}>
            <Field
              label="Email"
              required
              helperText="We'll never share your email."
            >
              <Input
                placeholder="me@example.com"
                variant={"outline"}
                type="email"
                borderWidth={2}
                p={2}
                rounded={6}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Field>
            <Field label="Password" required>
              <PasswordInput
                placeholder="Enter your password"
                variant={"outline"}
                type="password"
                borderWidth={2}
                p={2}
                rounded={6}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Flex flexDirection={"column"} gap={2} w={"full"}>
            <Button
              variant={"subtle"}
              className=" bg-blue-600 text-white"
              rounded={6}
              w="full"
              onClick={handleSignIn}
            >
              Login
            </Button>
            <Text fontSize={"sm"} color="gray.500" mt={2}>
              Don't have an account?{" "}
              <Text
                as="span"
                color="blue.500"
                onClick={handleCreateAccount}
                cursor="pointer"
              >
                <NavLink to={"/signup"}>Sign up</NavLink>
              </Text>
            </Text>
          </Flex>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
}
