import { OfferCard } from './OfferCard';
import Link from 'next/link';
export default function LandingPageOffers() {
  const offers = [
    {
      title: 'Tools',
      description: 'Hostelpilot offers a range of tools to help you plan your next trip. From travel budget calculators to travel destination finders, we have you covered.',
      imagePath: '/images/offers/listProperty.png', 
      link: '/tools'
    },
    {
      title: 'Search Engine',
      description: 'You can search for hostels by name or location. View all the details of the hostel and the rooms available.Select the perfect rooms based on your budget and preferences.',
      imagePath: '/images/offers/searchEngine.png', 
      link: '/search'
    },
    {
      title: 'List your property',
      description: 'You can list your hostel for FREE. You can also add details about the hostel and the rooms available. Users from our site will be able to see your property and contact you for booking.',
      imagePath: '/images/offers/blog.png',
      link: 'https://hosteladmin.com/signup'
    },
  ]
  return (
    <div className="mt-8 mb-12">
      <div className="grid items-end grid-cols-1 md:grid-cols-2 lg:grid-cols-[30%,40%,30%] gap-6 w-[90%] mx-auto">
        {offers.map((offer, index) => (
          <Link href={offer.link} key={offer.title}><OfferCard index={index+1} title={offer.title} description={offer.description} imagePath={offer.imagePath} /></Link>
        ))}
      </div>
    </div>
  );
}