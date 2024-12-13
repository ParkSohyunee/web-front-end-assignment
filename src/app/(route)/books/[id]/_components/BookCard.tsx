import { BookType } from '@/app/_lib/types/book';

import styles from './BookCard.module.css';

interface BookCardProps {
  book: BookType;
}

export default function BookCard({ book }: BookCardProps) {
  const { title, description, author, price, stock } = book;

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h1>{title}</h1>
        <span>{author}</span>
      </div>
      <article className={styles.detail}>
        <p>{description}</p>
        <p>{price}원</p>
        <div>수량 {stock}</div>
      </article>
    </section>
  );
}
