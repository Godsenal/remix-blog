import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { ActionFunction, Form, redirect, useActionData } from "remix";
import PageLayout from "~/components/PageLayout";
import { register } from "~/utils/auth.server";
import { userScheme } from "~/utils/validate";

type TErrors = Record<keyof Pick<User, "email" | "password">, string>;

export const action: ActionFunction = async ({ request }) => {
  const formData = await userScheme.validateForm(await request.formData());

  if (formData.errors) {
    return formData.errors;
  }

  await register(formData.data);

  return redirect("/login");
};

const Signup = () => {
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

export default Signup;
