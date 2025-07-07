import { PricingCard } from "./PricingCard";

export default function Pricing() {
  const pricingDetails = [
    {
      planType: 'Basic',
      planFor: 'small hostels (up to 30 students)',
      monthlyPrice: 499,
      features: [
        "Free publicity on platform",
        "List your hostel with photos & details",
        "Manage up to 30 students",
        "Basic dashboard",
        "Share digital hostel profile link"
      ],
      ctaText: "Get Started",
    },
    {
      planType: 'Pro',
      planFor: 'medium hostels (up to 100 students)',
      monthlyPrice: 999,
      features: [
        "Everything in Basic",
        "Unlimited student management",
        "Staff & Warden management",
        "Vacancy alerts & notifications",
        "Online payment tracking (manual entry)",
        "Enhanced hostel profile with customization",
        "Basic analytics & monthly reports",
        "Featured listing in search results"
      ],
      ctaText: "Start with PRO",
    },
    {
      planType: 'Enterprise',
      planFor: 'large hostels (100+ students)',
      monthlyPrice: 1999,
      features: [
        "Everything in Pro",
        "Custom branding (logo & colors)",
        "Advanced reports & analytics",
        "Online payment gateway integration",
        "Multi-branch hostel management",
        "Priority support & dedicated manager",
        "API access for integrations",
        "Bulk communication (SMS/Email)",
        "Community & forum features for students"
      ],
      ctaText: "Get Started",
    },
  ]
  
  return (
    <div className="my-12 w-[90%] mx-auto">
      <div className="my-12 text-center md:pb-8">
        <h1 className="text-4xl md:text-6xl">Choose your plan</h1>
        <p className="text-gray-500 text-base md:text-xl tracking-wider text-semibold">Affordable and adaptable pricing to suit your goals.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
      {
        pricingDetails.map((item, index) => {
          return (
            <div
              key={index}
              className={`${index === 1 ? "order-1 lg:order-none" : "order-2 lg:order-none"}`}
            >
                <PricingCard index={index} planType={item.planType} planFor={item.planFor} ctaText={item.ctaText} features={item.features} monthlyPrice={item.monthlyPrice} />
              </div>
          )
        })
      }
      </div>
    </div>
  )
}