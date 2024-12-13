'use client';

import { notFound } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './BookStock.module.css';

import { stockInputRules } from '@/app/_lib/constants/formValidationRules';
import { BookType } from '@/app/_lib/types/book';
import { DOMAIN_URL } from '@/app/_lib/constants/domain';

import CustomButton from '@/app/_components/CustomButton';

interface BookStockProps {
  bookId: number;
}

async function getBookDetail(id: string) {
  const response = await fetch(`${DOMAIN_URL}/api/books/${id}`, { cache: 'no-cache' });
  const book: BookType = await response.json();

  if (response.status !== 200) {
    notFound();
  }
  return book;
}

export default function BookStock({ bookId }: BookStockProps) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<Pick<BookType, 'stock'>>({
    mode: 'onChange',
    defaultValues: async () => {
      const book: BookType = await getBookDetail(String(bookId));
      return { stock: book.stock };
    },
  });

  const handleEditOn = useCallback(() => {
    setIsEdit(true);
  }, []);

  const handleEditOff = useCallback(() => {
    reset();
    setIsEdit(false);
  }, [reset]);

  const onSubmit = async (data: Pick<BookType, 'stock'>) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });

      // 수량 수정 후 책 상세 조회 fetch
      if (response.ok) {
        const updateBook = await getBookDetail(String(bookId));
        reset({ stock: updateBook.stock });
        handleEditOff();
      }
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <form className={styles.container}>
      <label>수량</label>
      <div className={styles.container}>
        <div>
          <input
            type="number"
            {...register('stock', stockInputRules)}
            disabled={!isEdit}
            className={styles.input}
          />
          <p className={styles.error}>{errors.stock && errors.stock.message}</p>
        </div>
        <div className={styles.buttons}>
          <CustomButton type="button" onClick={isEdit ? handleEditOff : handleEditOn}>
            {isEdit ? '취소' : '수정'}
          </CustomButton>
          <CustomButton
            type="button"
            onClick={handleSubmit(onSubmit)}
            isError={!isValid || !isEdit}
          >
            저장
          </CustomButton>
        </div>
      </div>
    </form>
  );
}
