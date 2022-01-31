import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { User } from "@prisma/client";
import classNames from "classnames";
import { ActionFunction, Form, redirect, useActionData } from "remix";
import invariant from "tiny-invariant";
import PageLayout from "~/components/PageLayout";
import { register } from "~/utils/auth.server";

type TErrors = Record<keyof Pick<User, "email" | "password">, string>;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {} as TErrors;

  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  }

  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof email === "string");
  invariant(typeof password === "string");

  await register({ email, password });

  return redirect("/login");
};

const Login = () => {
  const errors = useActionData<TErrors>();

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
          <Button type="submit">회원가입</Button>
        </Stack>
      </Form>
    </PageLayout>
  );
};

export default Login;
