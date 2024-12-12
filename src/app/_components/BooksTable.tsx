'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookType } from '@/app/_lib/types/book';
import { DATA_SIZE_PER_PAGE, PAGE_SIZE } from '@/app/_lib/constants/pagination';

import Pagination from './Pagination';

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
      <Pagination
        totalCount={totalCount}
        page={page}
        dataSize={DATA_SIZE_PER_PAGE}
        pageSize={PAGE_SIZE}
      />
    </section>
  );
}
