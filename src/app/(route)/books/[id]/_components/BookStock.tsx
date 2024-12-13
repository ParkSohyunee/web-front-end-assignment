'use client';

import { notFound } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { stockInputRules } from '@/app/_lib/constants/formValidationRules';
import { BookType } from '@/app/_lib/types/book';
import { DOMAIN_URL } from '@/app/_lib/constants/domain';

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
  }, []);

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
    <form>
      <label>수량</label>
      <div>
        <div>
          <input type="number" {...register('stock', stockInputRules)} disabled={!isEdit} />
          <p>{errors.stock && errors.stock.message}</p>
        </div>
        <button type="button" onClick={isEdit ? handleEditOff : handleEditOn}>
          {isEdit ? '취소' : '수정'}
        </button>
        <button type="button" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          저장
        </button>
      </div>
    </form>
  );
}
