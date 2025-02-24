import { Box, Card, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const SignUp = () => {
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
              />
            </Field>
            <Field label="Password" required>
              <Input
                placeholder="Enter your password"
                variant={"outline"}
                type="password"
                borderWidth={2}
                p={2}
                rounded={6}
              />
            </Field>
            <Field label="Confirm Password" required>
              <Input
                placeholder="Confirm your password"
                variant={"outline"}
                type="password"
                borderWidth={2}
                p={2}
                rounded={6}
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
          </Flex>
        </Card.Footer>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
