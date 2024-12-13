import { BookType } from '@/app/_lib/types/book';

import styles from './BookCard.module.css';

import BookStock from './BookStock';
import DeleteButton from './DeleteButton';

interface BookCardProps {
  book: BookType;
}

export default function BookCard({ book }: BookCardProps) {
  const { title, description, author, price, stock, id } = book;

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h1>{title}</h1>
        <span>{author}</span>
      </div>
      <article className={styles.detail}>
        <p>{description}</p>
        <p>{price}원</p>
        <BookStock stock={stock} bookId={id} />
      </article>
      <div>
        <DeleteButton bookId={id} />
      </div>
    </section>
  );
}
