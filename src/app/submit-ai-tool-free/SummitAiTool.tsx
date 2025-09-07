import React from 'react'
import { CreateListedAiForm } from '../app/my-tools/CreateListedAiForm'
import { CommonNav } from 'src/features/NavBar/CommonNav'
import Footer from 'src/features/Footer'

export default function SummitAiTool() {
  return (
    <div> 
      <CommonNav/>
    <div className="w-full max-w-[1200px] mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-700">Submit Your AI Tool for Free</h1>
      <p className="text-gray-600 mt-2">
        Showcase your AI tool on <strong>Toolsland.ai</strong>, the dedicated AI directory
        where developers, businesses, and enthusiasts come to discover the latest
        innovations. Listing is <strong>completely free</strong>, and our{" "}
        <strong>AI-powered recommendation engine</strong> helps match your tool with the
        right users based on their interests — boosting visibility, traffic, and growth.
      </p>

      <CreateListedAiForm tool={undefined} isPublic={true} />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700">What Happens Next?</h2>
        <p className="text-gray-600 mt-2">
          After you submit your AI tool, our team will review it within{" "}
          <strong>2–3 business days</strong>. Once approved, you’ll receive an email with
          a direct link to your tool’s page. You can then share it widely and start
          receiving visits, reviews, and recommendations from our platform.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-700">Frequently Asked Questions (FAQ)</h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">1. What is the purpose of this form?</h3>
          <p className="text-gray-600 mt-1">
            This form allows you to <strong>list your AI tool for free</strong> on
            Toolsland.ai, making it easier for people to discover, try, and review your
            product.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">2. Do I need to sign up to submit my AI tool?</h3>
          <p className="text-gray-600 mt-1">
            No, you can submit your tool without creating an account. However, signing up
            lets you <strong>edit, update, and manage</strong> your listing anytime.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">3. What are the benefits of submitting my AI tool here?</h3>
          <p className="text-gray-600 mt-1">
            By listing on Toolsland.ai, your tool gets exposure to a global audience of AI
            users, developers, and businesses. You’ll gain{" "}
            <strong>traffic, reviews, feedback, and recommendations</strong> from our
            AI-driven discovery system.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">4. How does the AI recommendation system work?</h3>
          <p className="text-gray-600 mt-1">
            Toolsland.ai uses an <strong>advanced AI recommendation engine</strong> that
            suggests your tool to users based on their interests, previous activity, and
            categories they browse. This ensures your tool reaches the most relevant
            audience.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">5. How long does it take to review my submission?</h3>
          <p className="text-gray-600 mt-1">
            Reviews typically take <strong>2–3 business days</strong>. We’ll notify you via
            email once your tool goes live.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">6. Can I edit my tool after it’s published?</h3>
          <p className="text-gray-600 mt-1">
            Yes, if you signed up before submitting. Without an account, editing later won’t
            be possible — we recommend registering to keep full control of your listing.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">7. Who can submit a tool?</h3>
          <p className="text-gray-600 mt-1">
            Anyone — whether you’re an <strong>independent developer, startup founder, or
            established company</strong>. If you’ve built an AI-powered tool, product, or
            service, you’re welcome to list it.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">8. Does it cost anything to submit?</h3>
          <p className="text-gray-600 mt-1">
            No, submitting your AI tool on Toolsland.ai is <strong>100% free</strong>.
            There are no hidden fees.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">9. Can users leave reviews on my tool?</h3>
          <p className="text-gray-600 mt-1">
            Yes! Users can leave <strong>reviews, ratings, and suggestions</strong> on your
            tool’s page — giving you valuable insights for improvement and social proof for
            future users. Though you will be able to make it available/unavailable for reviews from  admin panel.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">10. How do users discover my tool?</h3>
          <p className="text-gray-600 mt-1">
            Tools are displayed in categories, search results, and through{" "}
            <strong>personalized AI recommendations</strong>. This ensures your tool gets
            visibility from multiple channels on our platform.
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}
