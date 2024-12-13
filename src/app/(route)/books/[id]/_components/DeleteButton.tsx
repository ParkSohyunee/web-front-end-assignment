'use client';

import { useRouter } from 'next/navigation';
import CustomButton from '@/app/_components/CustomButton';

interface DeleteButtonProps {
  bookId: number;
}

export default function DeleteButton({ bookId }: DeleteButtonProps) {
  const router = useRouter();

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('✅ 삭제를 완료했어요.');
        router.back();
      } else if (response.status === 404) {
        alert('😐 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('error:', error);
    }
  };

  return <CustomButton onClick={handleDeleteBook}>삭제하기</CustomButton>;
}
