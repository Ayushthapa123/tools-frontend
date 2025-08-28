import Link from 'next/link'
import Button from 'src/components/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-300">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-indigo-600">?</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, we couldnt find the page your looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button 
              label="Go Back Home"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            />
          </Link>
          
          <Link href="/tools">
            <Button 
              variant="outlined" 
              label="Explore Our Tools"
              className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            />
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link href="/contact-us" className="text-indigo-600 hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  )
}
