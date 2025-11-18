/**
 * 페이지명: Blog (SSG)
 * 용도: 블로그 페이지 (정적 사이트 생성 - SSG)
 *
 * [Next.js 특징]
 * - 빌드 시점에 페이지를 미리 생성 (Static Site Generation)
 * - generateStaticParams를 사용하여 동적 경로도 정적 생성 가능
 * - 매우 빠른 초기 로딩 속도 (CDN에서 HTML 제공)
 *
 * [신입 개발자를 위한 설명]
 * SSG는 빌드 시 페이지를 미리 생성하여 HTML 파일로 저장합니다.
 * 사용자가 접근할 때는 이미 만들어진 HTML을 바로 제공하므로
 * 매우 빠르며 서버 부하가 적습니다. 콘텐츠가 자주 변경되지 않는
 * 블로그, 문서 사이트 등에 적합합니다.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: '블로그 - Next.js vs Remix',
  description: 'Next.js와 Remix 비교 블로그',
};

/**
 * 블로그 포스트 타입
 */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

/**
 * 정적 블로그 데이터
 * 실제 프로젝트에서는 CMS나 마크다운 파일에서 가져옵니다.
 */
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Next.js 16의 새로운 기능들',
    excerpt:
      'Next.js 16에서 추가된 Turbopack, 향상된 캐싱 시스템, 그리고 성능 개선 사항을 알아봅니다.',
    content: '...',
    author: '김개발',
    publishedAt: '2025-01-15',
    tags: ['Next.js', '성능', 'Turbopack'],
  },
  {
    id: '2',
    title: 'Remix v2의 Vite 통합',
    excerpt:
      'Remix v2에서 Vite를 기본 번들러로 채택하면서 개발 경험이 크게 향상되었습니다.',
    content: '...',
    author: '이프론트',
    publishedAt: '2025-01-10',
    tags: ['Remix', 'Vite', '빌드 도구'],
  },
  {
    id: '3',
    title: 'Server Components vs Loaders',
    excerpt:
      'Next.js의 Server Components와 Remix의 Loaders를 비교하여 각각의 장단점을 분석합니다.',
    content: '...',
    author: '박풀스택',
    publishedAt: '2025-01-05',
    tags: ['비교', 'Server Components', 'Loaders'],
  },
  {
    id: '4',
    title: 'SEO 최적화 전략 비교',
    excerpt: '두 프레임워크에서 SEO를 최적화하는 방법과 메타데이터 관리 전략을 살펴봅니다.',
    content: '...',
    author: '최웹마스터',
    publishedAt: '2025-01-01',
    tags: ['SEO', '메타데이터', '최적화'],
  },
  {
    id: '5',
    title: '폼 처리: Server Actions vs Form Actions',
    excerpt:
      'Next.js의 Server Actions와 Remix의 Form Actions를 비교하여 폼 처리 방식의 차이를 알아봅니다.',
    content: '...',
    author: '정리액트',
    publishedAt: '2024-12-28',
    tags: ['폼', 'Server Actions', 'Form Actions'],
  },
  {
    id: '6',
    title: '번들 크기 최적화 기법',
    excerpt:
      '코드 스플리팅, 트리 쉐이킹, 동적 임포트 등을 활용한 번들 크기 최적화 방법을 소개합니다.',
    content: '...',
    author: '강최적화',
    publishedAt: '2024-12-25',
    tags: ['최적화', '번들', '성능'],
  },
];

/**
 * 블로그 목록 페이지
 */
export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">개발 블로그</h1>
        <p className="text-xl text-gray-600">
          Next.js와 Remix에 대한 인사이트와 비교 분석
        </p>
      </div>

      {/* 주요 포스트 */}
      {blogPosts.length > 0 && (
        <div className="mb-12">
          <Card hoverable>
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-12">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">Featured</h3>
                  <p className="text-blue-100">주요 포스트</p>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center space-x-2 mb-4">
                  {blogPosts[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{blogPosts[0].author}</span>
                    <span>•</span>
                    <span>{formatDate(blogPosts[0].publishedAt)}</span>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    자세히 읽기 →
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 포스트 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card hoverable className="h-full">
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* 카테고리 필터 (추후 구현) */}
      <div className="mt-12">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">카테고리</h3>
          </CardHeader>
          <CardBody>
            <div className="flex flex-wrap gap-2">
              {['전체', 'Next.js', 'Remix', '성능', '최적화', 'SEO', '비교'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
