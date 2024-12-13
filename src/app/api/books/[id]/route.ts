import { NextRequest } from 'next/server';
import { BookType } from '@/app/_lib/types/book';

/** 책 상세 조회 API */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: number }> }) {
  const { id: bookId } = await params;

  try {
    const response = await fetch(`http://localhost:3001/books/${bookId}`);
    const book: BookType = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify(book));
    } else {
      return new Response(JSON.stringify({ message: '일치하는 데이터 없음' }), { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: '데이터 조회 실패' }), { status: 500 });
  }
}

/** 책 삭제 API */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: number }> },
) {
  const { id: bookId } = await params;

  try {
    const response = await fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return new Response(null);
    } else {
      return new Response(JSON.stringify({ message: '일치하는 데이터 없음' }), { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: '데이터 삭제 실패' }), { status: 500 });
  }
}
