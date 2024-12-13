import { notFound } from 'next/navigation';

import { BookType } from '@/app/_lib/types/book';
import { DOMAIN_URL } from '@/app/_lib/constants/domain';

interface BookDetailPageParamsType {
  params: Promise<{ id: string }>;
}

async function getBookDetail(id: string) {
  const response = await fetch(`${DOMAIN_URL}/api/books/${id}`, { cache: 'no-cache' });
  const book: BookType = await response.json();

  if (response.status !== 200) {
    notFound();
  }
  return book;
}

export default async function BookDetailPage({ params }: BookDetailPageParamsType) {
  const { id: bookId } = await params;
  const book = await getBookDetail(bookId);

  return <main>{book.title}</main>;
}
