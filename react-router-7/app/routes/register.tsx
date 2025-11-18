import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { json, redirect } from "react-router";
import { Form, Link, useActionData } from "react-router";
import { Card } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { createUser, validateEmail, validatePassword } from "~/lib/auth.server";
import { createUserSession, getUserId } from "~/lib/session.server";

/**
 * 컴포넌트명: Register
 * 용도: 회원가입 페이지
 */

export const meta: MetaFunction = () => {
  return [{ title: "회원가입 - React Router 7 App" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const name = formData.get("name");

  /**
   * [유효성 검사]
   */
  const errors: Record<string, string> = {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!email || typeof email !== "string") {
    errors.email = "이메일을 입력해주세요.";
  } else {
    const emailError = validateEmail(email);
    if (emailError) {
      errors.email = emailError;
    }
  }

  if (!password || typeof password !== "string") {
    errors.password = "비밀번호를 입력해주세요.";
  } else {
    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  /**
   * [사용자 생성]
   */
  const result = await createUser(
    email as string,
    password as string,
    name as string
  );

  if (result.error) {
    return json(
      {
        errors: {
          email: result.error,
        },
      },
      { status: 400 }
    );
  }

  if (!result.user) {
    return json(
      {
        errors: {
          email: "회원가입 중 오류가 발생했습니다.",
        },
      },
      { status: 500 }
    );
  }

  /**
   * [세션 생성 및 리다이렉트]
   */
  return createUserSession({
    userId: result.user.id,
    email: result.user.email,
    name: result.user.name,
  });
}

export default function Register() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-600">새 계정을 만드세요</p>
        </div>

        <Card>
          <Form method="post" className="space-y-4">
            <Input
              name="name"
              type="text"
              label="이름"
              placeholder="홍길동"
              error={actionData && "errors" in actionData && actionData.errors ? actionData.errors.name : undefined}
              required
              autoComplete="name"
              leftIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              }
            />

            <Input
              name="email"
              type="email"
              label="이메일"
              placeholder="example@domain.com"
              error={actionData && "errors" in actionData ? actionData.errors?.email : undefined}
              required
              autoComplete="email"
              leftIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
            />

            <Input
              name="password"
              type="password"
              label="비밀번호"
              placeholder="••••••••"
              error={actionData && "errors" in actionData && actionData.errors ? actionData.errors.password : undefined}
              required
              autoComplete="new-password"
              helper="최소 8자 이상"
              leftIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />

            <Input
              name="confirmPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="••••••••"
              error={actionData && "errors" in actionData && actionData.errors ? actionData.errors.confirmPassword : undefined}
              required
              autoComplete="new-password"
              leftIcon={
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                name="terms"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <label className="ml-2 text-sm text-gray-600">
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  이용약관
                </Link>
                과{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  개인정보처리방침
                </Link>
                에 동의합니다.
              </label>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              회원가입
            </Button>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                로그인
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
