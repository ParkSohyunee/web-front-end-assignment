import Link from 'next/link';

import styles from './page.module.css';

export default async function Home() {
  return (
    <main className={styles.container}>
      <h1>Books App</h1>
      <Link href="/books">책 목록 보러가기</Link>
    </main>
  );
}
