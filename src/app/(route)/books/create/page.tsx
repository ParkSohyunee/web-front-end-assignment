'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BookType } from '@/app/_lib/types/book';

type CreateBookType = Omit<BookType, 'id' | 'totalSales'>;

export default function CreateBookPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<CreateBookType>({ mode: 'onBlur' });

  const onSubmit = async (data: CreateBookType) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const result: BookType = await response.json();
      router.push('/books');
      console.log(result);
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <main>
      <form>
        <h1>책 추가</h1>

        <div>
          <label>제목 *</label>
          <div>
            <input {...register('title', { required: '제목을 입력해주세요.' })} />
            <p>{errors.title && errors.title.message}</p>
          </div>
        </div>
        <div>
          <label>저자 *</label>
          <div>
            <input {...register('author', { required: '저자를 입력해주세요.' })} />
            <p>{errors.author && errors.author.message}</p>
          </div>
        </div>
        <div>
          <label>소개</label>
          <div>
            <input
              maxLength={31}
              {...register('description', {
                maxLength: { value: 30, message: '소개는 최대 30자까지 입력할 수 있어요.' },
              })}
            />
            <p>{errors.description && errors.description.message}</p>
          </div>
        </div>
        <div>
          <label>가격 *</label>
          <div>
            <input
              type="number"
              {...register('price', { required: '가격을 입력해주세요.', min: 0 })}
            />
            <p>{errors.price && errors.price.message}</p>
          </div>
        </div>
        <div>
          <label>수량 *</label>
          <div>
            <input
              type="number"
              {...register('stock', {
                required: '수량을 입력해주세요.',
                min: { value: 1, message: '최소 1개 이상 입력' },
              })}
            />
            <p>{errors.stock && errors.stock.message}</p>
          </div>
        </div>

        <button type="button" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          추가하기
        </button>
      </form>
    </main>
  );
}
