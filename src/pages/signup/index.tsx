import { Box, Card, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { PasswordInput } from "@/components/ui/password-input";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Check your email for a confirmation link!");
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} h="full">
      <Card.Root maxW={"sm"} p={4}>
        <Card.Header>
          <Card.Title fontSize={"large"} fontWeight={"medium"}>
            Create an account
          </Card.Title>
          <Card.Description>
            Fill in the form to create an account and start using the app.
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
            <Field label="Confirm Password" required>
              <PasswordInput
                placeholder="Confirm your password"
                variant={"outline"}
                type="password"
                borderWidth={2}
                p={2}
                rounded={6}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Flex flexDirection={"column"} gap={2} w={"full"}>
            <Text fontSize={"sm"} color="gray.500">
              By signing up, you agree to our{" "}
              <Text as="span" color="blue.500">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text as="span" color="blue.500">
                Privacy Policy
              </Text>
            </Text>
            <Button
              disabled={loading || !email || !password || !confirmPassword}
              onClick={handleSignUp}
              variant={"subtle"}
              className=" bg-blue-600 text-white"
              rounded={6}
              w="full"
            >
              Sign Up
            </Button>
            <Text fontSize={"sm"} color="gray.500" textAlign="center">
              Already have an account?{" "}
              <Text
                as="span"
                color="blue.500"
                onClick={() => (window.location.href = "/auth")}
              >
                <NavLink to={"/auth"}>Login here</NavLink>
              </Text>
            </Text>
            {error && (
              <Box color="red.500" textAlign="center">
                {error}
              </Box>
            )}
          </Flex>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
