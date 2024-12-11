'use client';

import { useEffect, useState } from 'react';

import { BookType } from '../_lib/types/book';

export default function BooksTable() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books');
        const result = await response.json();
        setBooks(result);
      } catch (error) {
        console.error('error:', error);
      }
    };

    fetchData();
  }, []);

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
    </section>
  );
}
