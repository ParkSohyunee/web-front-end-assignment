import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>일치하는 정보를 찾을 수 없습니다.</p>
      <Link href="/books">Return Home</Link>
    </div>
  );
}
