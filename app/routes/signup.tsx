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
      <Form
        method="post"
        className="flex flex-col space-y-4 max-w-screen-md mx-auto"
      >
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          name="email"
          type="email"
          className={classNames(
            "border-2 rounded-md",
            errors?.email && "border-red-500"
          )}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          className={classNames(
            "border-2 rounded-md",
            errors?.password && "border-red-500"
          )}
          type="password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-4"
        >
          회원가입
        </button>
      </Form>
    </PageLayout>
  );
};

export default Login;
