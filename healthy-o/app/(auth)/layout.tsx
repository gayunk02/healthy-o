import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center py-4">
        <Link href="/">
          <Image
            src="/headlogo.png"
            alt="Healthy-O Logo"
            width={140}
            height={30}
            priority
          />
        </Link>
      </div>
      {children}
    </div>
  );
} 