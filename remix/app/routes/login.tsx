import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { Card } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";
import { authenticateUser, validateEmail } from "~/lib/auth.server";
import { createUserSession, getUserId } from "~/lib/session.server";

/**
 * 컴포넌트명: Login
 * 용도: 로그인 페이지
 *
 * [Remix v2 특징]
 * - action: 폼 제출 처리
 * - loader: 이미 로그인한 사용자 체크
 * - Form: Progressive Enhancement
 * - useActionData: 서버 액션 결과 접근
 *
 * [신입 개발자를 위한 설명]
 * 로그인 페이지는 사용자 인증을 처리합니다.
 * Progressive Enhancement로 JavaScript 없이도 동작합니다.
 */

export const meta: MetaFunction = () => {
  return [{ title: "로그인 - Remix App" }];
};

/**
 * [Loader]
 * 이미 로그인한 사용자는 홈으로 리다이렉트
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);

  if (userId) {
    return redirect("/");
  }

  return json({});
}

/**
 * [Action]
 * 로그인 폼 제출 처리
 */
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = formData.get("redirectTo") || "/";

  /**
   * [유효성 검사]
   */
  const errors: Record<string, string> = {};

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
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  /**
   * [사용자 인증]
   */
  const user = await authenticateUser(email as string, password as string);

  if (!user) {
    return json(
      {
        errors: {
          email: "이메일 또는 비밀번호가 올바르지 않습니다.",
        },
      },
      { status: 400 }
    );
  }

  /**
   * [세션 생성 및 리다이렉트]
   */
  return createUserSession(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
    },
    typeof redirectTo === "string" ? redirectTo : "/"
  );
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">로그인</h1>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        <Card>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />

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
              autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button type="submit" variant="primary" fullWidth>
              로그인
            </Button>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                계정이 없으신가요?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* 데모 계정 안내 */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-2">데모용 안내</p>
            <p className="text-blue-800">
              회원가입 페이지에서 새 계정을 생성하거나,
              <br />
              아래 데모 계정으로 로그인할 수 있습니다:
            </p>
            <div className="mt-2 p-2 bg-white rounded border border-blue-200">
              <p className="text-blue-900 font-mono text-xs">
                이메일: demo@example.com
                <br />
                비밀번호: demo123456
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
