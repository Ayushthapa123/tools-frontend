// import { SearchBox } from 'src/features/Header/SearchBox';
import Footer from 'src/features/Footer';

import { Metadata } from 'next';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { Domain, AiType, AiCapability, ProductType, UserType, ToolUserType } from 'src/gql/graphql';
import { enumToOptions } from 'src/utils/enumToArray';
import { convertToSlug } from 'src/utils/convertToSlug';
import Link from 'next/link';
import { enumToText } from 'src/utils/enumToText';
export const metadata: Metadata = {
  title: 'Ai Tools Categories - Toolsland.ai',
  description:
    'Explore the top AI tools organized by categories like ai type,domain,ai capability,product type,user type etc. for business, marketing, coding, design, and more. Find the right AI tools to boost productivity and creativity',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logohp512.png',
    title: 'Ai Tools Categories - Toolsland.ai',
  },
};

export default function Home() {
  const aiTypes = enumToOptions(AiType)?.filter(item => item.value !== AiType.Other);
  const aiTypesWithSlug = aiTypes?.map(item => ({
    ...item,
    slug: convertToSlug(item.value.toLowerCase()),
    text: `${enumToText(item.value)} tools`,
  }));
  const aiDomains = enumToOptions(Domain)?.filter(item => item.value !== Domain.Other);
  const aiDomainsWithSlug = aiDomains?.map(item => ({
    ...item,
    slug: convertToSlug(item.value.toLowerCase()),
    text: `${enumToText(item.value)} tools`,
  }));
  const aiCapabilities = enumToOptions(AiCapability)?.filter(item => item.value !== AiCapability.Other);
  const aiCapabilitiesWithSlug = aiCapabilities?.map(item => ({
    ...item,
    slug: convertToSlug(item.value.toLowerCase()),
    text: `${enumToText(item.value)} tools`,
  }));

  const productTypes = enumToOptions(ProductType)?.filter(item => item.value !== ProductType.Other);
  const productTypesWithSlug = productTypes?.map(item => ({
    ...item,
    slug: convertToSlug(`ai-${item.value.toLowerCase()}`),
    text: `${enumToText(item.value)} tools`,
  }));

  const userTypes = enumToOptions(ToolUserType)?.filter(item => item.value !== ToolUserType.Other);
  const userTypesWithSlug = userTypes?.map(item => ({
    ...item,
    slug: convertToSlug(`${item.value.toLowerCase()}`),
    text: `ai tools for ${enumToText(item.value)} `,
  }));

  return (
    <div className="w-full ">
      <CommonNav />
      <div className="mx-auto h-full max-w-[1800px]  border-b bg-white p-5 py-3 shadow-md">
        <h1>Ai Tools Categories</h1>

        <div className='mb-10'>
          <h2>Ai Types</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aiTypesWithSlug?.map(item => (
              <Link href={`/ai-type/${item.slug}`} key={item.value}>
                <div className="rounded-md border p-3">
                  <h3>{item.text}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <h2>Ai Domains</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aiDomainsWithSlug?.map(item => (
              <Link href={`/domain/${item.slug}`} key={item.value}>
                <div className="rounded-md border p-3">
                  <h3>{item.text}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <h2>Ai Capabilities</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {aiCapabilitiesWithSlug?.map(item => (
              <Link href={`/ai-capability/${item.slug}`} key={item.value}>
                <div className="rounded-md border p-3">
                  <h3>{item.text}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <h2>Product Types</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {productTypesWithSlug?.map(item => (
              <Link href={`/product-type/${item.slug}`} key={item.value}>
                <div className="rounded-md border p-3">
                  <h3>{item.text}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <h2>Tool User Types</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {userTypesWithSlug?.map(item => (
              <Link href={`/user-type/${item.slug}`} key={item.value}>
                <div className="rounded-md border p-3">
                  <h3>{item.text}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
