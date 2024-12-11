import { NextRequest } from 'next/server';
import { promises } from 'fs';
import path from 'path';

import { BookType } from '@/app/_lib/types/book';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.get('page');
  const limit = request.nextUrl.searchParams.get('limit');

  const page = params !== 'null' ? params : 1;
  const size = limit !== 'null' ? Number(limit) : 10; // 한 페이지당 불러올 데이터

  const startIndex = (Number(page) - 1) * size;
  const endIndex = startIndex + size;

  try {
    const filePath = path.join(process.cwd(), 'data', 'books.json');
    const data = await promises.readFile(filePath, 'utf-8'); // string
    const books: BookType[] = JSON.parse(data); // object

    return Response.json({
      data: books.slice(startIndex, endIndex),
      totalCount: books.length,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: '데이터 조회 실패' }), { status: 500 });
  }
}
