import { PricingCard } from "./PricingCard";

export default function Pricing() {
  const pricingDetails = [
    {
      planType: 'Basic',
      planFor: 'small hostels',
      monthlyPrice: 499,
      features: [ "Free publicity", "list your hostel", "manage student", "build online presence", "share digital profile" ],
      ctaText: "Get Started",
    },
     {
      planType: 'Pro',
      planFor: 'big hostels',
      monthlyPrice: 999,
      features: [ "Free publicity", "list your hostel", "manage student", "build online presence", "share digital profile" ],
      ctaText: "Start with PRO",
    },
     {
      planType: 'Enterprise',
      planFor: 'Large hostels',
      monthlyPrice: 1999,
      features: [ "Free publicity", "list your hostel", "manage student", "build online presence", "share digital profile" ],
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