import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/Card";
import { formatDate, timeAgo } from "~/lib/utils";

/**
 * 컴포넌트명: Blog
 * 용도: 블로그 목록 페이지 (SSG 시뮬레이션)
 *
 * [Remix v2 특징]
 * - loader: 서버에서 데이터 페칭
 * - Cache-Control 헤더로 캐싱 제어
 * - 정적 콘텐츠 최적화
 */

export const meta: MetaFunction = () => {
  return [
    { title: "블로그 - Remix App" },
    { name: "description", content: "Remix 블로그 게시글" },
  ];
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
}

export async function loader({ request }: LoaderFunctionArgs) {
  /**
   * [더미 블로그 데이터]
   */
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Remix v2 마이그레이션 가이드",
      excerpt:
        "Remix v1에서 v2로 마이그레이션하는 완벽한 가이드. Vite 통합과 주요 변경사항을 다룹니다.",
      author: "개발팀",
      publishedAt: new Date("2024-01-20").toISOString(),
      category: "Tutorial",
      readTime: 8,
    },
    {
      id: "2",
      title: "Vite의 장점과 활용법",
      excerpt:
        "왜 Vite를 사용해야 하는가? 빠른 개발 경험과 최적화된 빌드를 제공하는 Vite의 모든 것.",
      author: "김개발",
      publishedAt: new Date("2024-01-18").toISOString(),
      category: "Technology",
      readTime: 6,
    },
    {
      id: "3",
      title: "TypeScript 베스트 프랙티스",
      excerpt:
        "실무에서 바로 적용할 수 있는 TypeScript 활용 팁과 패턴. 타입 안정성을 높이는 방법.",
      author: "이타입",
      publishedAt: new Date("2024-01-15").toISOString(),
      category: "Best Practices",
      readTime: 10,
    },
  ];

  /**
   * [캐싱 설정]
   * Cache-Control 헤더로 브라우저 및 CDN 캐싱 제어
   * - public: CDN에서 캐시 가능
   * - max-age=300: 5분간 캐시
   * - s-maxage=600: CDN에서 10분간 캐시
   */
  return json(
    { blogPosts },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=600",
      },
    }
  );
}

export default function Blog() {
  const { blogPosts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">블로그</h1>
          <p className="text-lg text-gray-600">
            Remix와 웹 개발에 대한 인사이트를 공유합니다.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.readTime}분 읽기
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
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
                      {post.author}
                    </span>
                    <span className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {timeAgo(post.publishedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
