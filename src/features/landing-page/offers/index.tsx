import { OfferCard } from './OfferCard';

export default function LandingPageOffers() {
  const offers = [
    {
      title: 'Blogs',
      description: 'You can read the blogs written by our team and get the latest news and updates about the hostel industry. We guide you to find the perfect hostel for your needs.',
      imagePath: '/images/offers/blog.png',
    },
    {
      title: 'Search Engine',
      description: 'You can search for hostels by name or location. View all the details of the hostel and the rooms available.Select the perfect rooms based on your budget and preferences.',
      imagePath: '/images/offers/searchEngine.png',
    },
    {
      title: 'List your property',
      description: 'You can list your hostel for FREE. You can also add details about the hostel and the rooms available. Users from our site will be able to see your property and contact you for booking.',
      imagePath: '/images/offers/listProperty.png',
    },
  ]
  return (
    <div className="mt-8 mb-12">
      <div className="grid items-end grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,40%,30%] gap-6 w-[90%] mx-auto">
        {offers.map((offer, index) => (
          <OfferCard key={offer.title} index={index+1} title={offer.title} description={offer.description} imagePath={offer.imagePath} />
        ))}
      </div>
    </div>
  );
}