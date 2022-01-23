import { User } from "@prisma/client";
import classNames from "classnames";
import {
  ActionFunction,
  Form,
  Link,
  redirect,
  useActionData,
  useSearchParams,
} from "remix";
import invariant from "tiny-invariant";
import PageLayout from "~/components/PageLayout";
import { createUserSession, login } from "~/utils/auth.server";

type TErrors = Record<keyof Pick<User, "email" | "password">, string>;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo");
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

  const user = await login({ email, password });

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
          로그인
        </button>
        <Link to="/signup" className="text-blue-500 mx-auto">
          회원가입
        </Link>
        {redirectTo && (
          <input name="redirectTo" type="hidden" value={redirectTo} />
        )}
      </Form>
    </PageLayout>
  );
};

export default Login;
