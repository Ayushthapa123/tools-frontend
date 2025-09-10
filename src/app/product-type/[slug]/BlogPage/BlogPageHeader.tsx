import React from 'react'

export default function BlogPageHeader({title}: {title: string}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900  mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 ">
          Discover the most powerful AI tools in this category with pricing, features, demo and use cases
        </p>
      </div>
    </div>
  )
}
