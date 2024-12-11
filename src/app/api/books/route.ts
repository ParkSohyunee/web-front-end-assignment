import { promises } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'books.json');
    const data = await promises.readFile(filePath, 'utf-8'); // string
    const books = JSON.parse(data); // object
    return Response.json(books);
  } catch (error) {
    return new Response(JSON.stringify({ message: '데이터 조회 실패' }), { status: 500 });
  }
}
