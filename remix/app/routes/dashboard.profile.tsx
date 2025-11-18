import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Card } from "~/components/ui/Card";
import { Input } from "~/components/ui/Input";
import { Button } from "~/components/ui/Button";

/**
 * 컴포넌트명: Dashboard Profile
 * 용도: 프로필 관리 페이지
 *
 * [Remix v2 특징]
 * - Form: Progressive Enhancement를 지원하는 폼
 * - action: 폼 제출 처리
 * - useActionData: action의 결과 데이터 접근
 */

export const meta: MetaFunction = () => {
  return [{ title: "프로필 - Remix App" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");

  /**
   * [유효성 검사]
   */
  const errors: Record<string, string> = {};

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = "이름을 입력해주세요.";
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    errors.email = "유효한 이메일을 입력해주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, success: false }, { status: 400 });
  }

  /**
   * [실제 프로젝트에서는]
   * 데이터베이스 업데이트를 수행합니다.
   */
  console.log("프로필 업데이트:", { name, email });

  return json({ success: true, message: "프로필이 업데이트되었습니다." });
}

export default function DashboardProfile() {
  const actionData = useActionData<typeof action>();

  return (
    <Card>
      <Card.Header>
        <h2 className="text-2xl font-bold text-gray-900">프로필 설정</h2>
      </Card.Header>
      <Card.Body>
        <Form method="post" className="space-y-4">
          <Input
            name="name"
            label="이름"
            defaultValue="홍길동"
            error={actionData && "errors" in actionData ? actionData.errors?.name : undefined}
            required
          />
          <Input
            name="email"
            type="email"
            label="이메일"
            defaultValue="hong@example.com"
            error={actionData && "errors" in actionData ? actionData.errors?.email : undefined}
            required
          />

          {actionData && "success" in actionData && actionData.success && "message" in actionData && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{actionData.message}</p>
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth>
            저장
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
