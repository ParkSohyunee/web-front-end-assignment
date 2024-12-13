'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { stockInputRules } from '@/app/_lib/constants/formValidationRules';
import { BookType } from '@/app/_lib/types/book';
import { DOMAIN_URL } from '@/app/_lib/constants/domain';

interface BookStockProps {
  bookId: number;
  stock: number;
}

export default function BookStock({ bookId, stock }: BookStockProps) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<Pick<BookType, 'stock'>>({
    mode: 'onChange',
    defaultValues: async () => {
      const response = await fetch(`${DOMAIN_URL}/api/books/${bookId}`, { cache: 'no-cache' });
      const book: BookType = await response.json();
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
      const result: BookType = await response.json();
      reset({ stock: result.stock });
      handleEditOff();
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
