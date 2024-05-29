/**
 * @Author: huweijian
 * @Date: 2024-04-11 13:39:26
 * @Desc: 发票操作错误
 */
'use client';
import { useEffect } from 'react';
export default function ErrorPage({
  error,
  reset,
}: Readonly<{
  error?: Error & { digest?: string };
  reset?: () => void;
}>) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.log(123456)
    console.log(error?.message);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">出现了些错误!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset && reset()
        }
      >
        Try again
      </button>
    </main>
  );
}