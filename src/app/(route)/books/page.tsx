import { Suspense } from 'react';

import BooksTable from '@/app/_components/BooksTable';

export default async function BooksPage() {
  return (
    <main>
      <Suspense fallback={<div>로딩</div>}>
        <BooksTable />
      </Suspense>
    </main>
  );
}
