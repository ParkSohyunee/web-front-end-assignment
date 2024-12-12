import Link from 'next/link';

import styles from './Pagination.module.css';

interface PaginationProps {
  totalCount: number;
  page: string | null;
  dataSize: number; // 한 페이지당 불러올 데이터
  pageSize: number; // 화면에 보여질 페이지 개수
}

export default function Pagination({ totalCount, page, dataSize, pageSize }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / dataSize); // 총 페이지 개수
  const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1; // 현재 페이지
  const pageGroup = Math.ceil(currentPage / pageSize); // 화면에 보여질 페이지 그룹

  // 화면에 보여질 데이터의 첫번째 페이지 번호와 마지막 페이지 번호 계산
  const firstPageNumber = (pageGroup - 1) * pageSize + 1;
  const lastPageNumber = pageGroup * pageSize > totalPages ? totalPages : pageGroup * pageSize;

  return (
    <div className={styles.container}>
      {pageGroup !== 1 && (
        <Link href={`?page=${firstPageNumber - 1}&limit=${dataSize}`}>{`<`} 이전</Link>
      )}

      {Array.from(
        { length: lastPageNumber - firstPageNumber + 1 },
        (_, i) => firstPageNumber + i,
      ).map((value, index) => (
        <Link
          key={index}
          href={`?page=${firstPageNumber + index}&limit=${dataSize}`}
          className={`${styles.page} ${currentPage === value && styles.active}`}
        >
          {value}
        </Link>
      ))}

      {pageGroup * pageSize < totalPages && (
        <Link href={`?page=${lastPageNumber + 1}&limit=${dataSize}`}>다음 {`>`}</Link>
      )}
    </div>
  );
}
