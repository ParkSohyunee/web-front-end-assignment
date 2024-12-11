'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookType } from '@/app/_lib/types/book';

export default function BooksTable() {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/books?page=${page}&limit=${limit}`);
        const result = await response.json();
        setBooks(result.data);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, [page]);

  // --페이지네이션
  const dataSize = 10; // 한 페이지당 불러올 데이터
  const pageSize = 3; // 화면에 보여질 페이지 개수
  const totalPages = Math.ceil(totalCount / dataSize); // 총 페이지 개수

  const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1; // 현재 페이지
  const pageGroup = Math.ceil(currentPage / pageSize); // 화면에 보여질 페이지 그룹

  // 화면에 보여질 데이터의 첫번째 페이지 번호와 마지막 페이지 번호 계산
  const firstPageNumber = (pageGroup - 1) * pageSize + 1;
  const lastPageNumber = pageGroup * pageSize > totalPages ? totalPages : pageGroup * pageSize;

  return (
    <section>
      <h1>책 목록</h1>
      <ul>
        {books?.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      {pageGroup !== 1 && <Link href={`?page=${firstPageNumber - 1}&limit=${dataSize}`}>이전</Link>}
      {Array.from(
        { length: lastPageNumber - firstPageNumber + 1 },
        (_, i) => firstPageNumber + i,
      ).map((value, index) => (
        <Link key={index} href={`?page=${firstPageNumber + index}&limit=${dataSize}`}>
          {value}
        </Link>
      ))}
      {pageGroup * pageSize < totalPages && (
        <Link href={`?page=${lastPageNumber + 1}&limit=${dataSize}`}>다음</Link>
      )}
    </section>
  );
}
