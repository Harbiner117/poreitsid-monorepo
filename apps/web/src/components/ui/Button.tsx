"use client";
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={`rounded-lg border px-3 py-1 hover:bg-gray-50 active:scale-[0.99] ${className}`}
    />
  );
}
