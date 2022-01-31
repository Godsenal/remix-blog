import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { User } from "@prisma/client";
import { ActionFunction, Form, useActionData, useSearchParams } from "remix";
import ChakraLink from "~/components/ChakraLink";
import PageLayout from "~/components/PageLayout";
import { createUserSession, login } from "~/utils/auth.server";
import { userScheme } from "~/utils/validate";

type TErrors = Record<keyof Pick<User, "email" | "password">, string>;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const validatedData = await userScheme.validateForm(formData);

  if (validatedData.errors) {
    return validatedData.errors;
  }

  const redirectTo = formData.get("redirectTo");

  const user = await login({ ...validatedData.data });

  if (!user) {
    return {
      password: "아이디 혹은 비밀번호가 잘못되었습니다.",
    };
  }

  return await createUserSession(
    String(user.user_id),
    typeof redirectTo === "string" && redirectTo ? redirectTo : "/"
  );
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const errors = useActionData<TErrors>();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <PageLayout>
      <Form method="post">
        <Stack>
          <FormControl>
            <FormLabel htmlFor="email">이메일</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              isInvalid={!!errors?.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">비밀번호</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              isInvalid={!!errors?.password}
            />
          </FormControl>

          <Button type="submit">로그인</Button>
          <Center>
            <ChakraLink to="/signup">회원가입</ChakraLink>
          </Center>
          {redirectTo && (
            <input name="redirectTo" type="hidden" value={redirectTo} />
          )}
        </Stack>
      </Form>
    </PageLayout>
  );
};

export default Login;
