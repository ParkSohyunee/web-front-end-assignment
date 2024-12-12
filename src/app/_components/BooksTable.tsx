'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyboardEvent, useEffect, useState } from 'react';

import styles from './BooksTable.module.css';

import { BookType } from '@/app/_lib/types/book';
import { DATA_SIZE_PER_PAGE, PAGE_SIZE } from '@/app/_lib/constants/pagination';

import Pagination from './Pagination';

export default function BooksTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<BookType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState('');

  const page = searchParams.get('page');

  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const formatKeyword = value.toLocaleLowerCase().split(' ').join('');

    if (e.key === 'Enter') {
      if (value.trim()) {
        setKeyword(formatKeyword);
        router.push(`?page=1&limit=10&search=${keyword}`); // 검색어 입력 시 처음 페이지로 이동
      } else {
        router.push(`/books`);
        setKeyword('');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(searchParams.toString());
      if (keyword) {
        params.set('search', keyword);
      }
      try {
        const response = await fetch(`/api/books?${params.toString()}`);
        const result = await response.json();
        setBooks(result.data);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, [page, keyword]);

  return (
    <section className={styles.container}>
      <h1>📚 Books</h1>
      <div className={styles.searchBar}>
        <input onKeyUp={onKeyHandler} placeholder="제목 또는 저자명을 입력후 엔터를 눌러주세요." />
        <Link href="/books/create" className={styles.addButton}>
          + 책 추가하기
        </Link>
      </div>

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
            <tr>
              <th>ID</th>
              <th className={styles.item}>제목</th>
              <th className={styles.item}>작가</th>
              <th>판매수량</th>
            </tr>
          </thead>
          <tbody>
            {books?.map(({ id, title, author, totalSales }) => (
              <tr key={id}>
                <td>{id}</td>
                <td className={styles.item}>
                  <Link href={'/'}>{title}</Link>
                </td>
                <td className={styles.item}>{author}</td>
                <td>{totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalCount={totalCount}
        page={page}
        keyword={keyword}
        dataSize={DATA_SIZE_PER_PAGE}
        pageSize={PAGE_SIZE}
      />
    </section>
  );
}
