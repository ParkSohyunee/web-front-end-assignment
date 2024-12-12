'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './BooksTable.module.css';

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
    <section className={styles.container}>
      <h1>책 목록</h1>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>No.</th>
            <th className={styles.item}>제목</th>
            <th className={styles.item}>작가</th>
            <th>판매수량</th>
          </tr>
        </thead>
        <tbody>
          {books?.map(({ id, title, author, totalSales }) => (
            <tr key={id}>
              <td>{id}</td>
              <td className={styles.item}>{title}</td>
              <td className={styles.item}>{author}</td>
              <td>{totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalCount={totalCount}
        page={page}
        dataSize={DATA_SIZE_PER_PAGE}
        pageSize={PAGE_SIZE}
      />
    </section>
  );
}
