import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold text-gray-700 mb-4">404</h2>
        <p className="text-xl text-gray-500 mb-6">Page not found</p>
        <Link href="/" className="btn-primary no-underline">
          Return home
        </Link>
      </div>
    </div>
  );
}
