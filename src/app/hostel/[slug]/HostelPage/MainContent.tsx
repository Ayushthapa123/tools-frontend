
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import {
  Hostel,
} from 'src/gql/graphql';
import { MapProvider } from 'src/features/MapProvider';
import {
  FaFacebook,
} from 'react-icons/fa';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { MapComponent } from 'src/features/GoogleMap';
import AmenitiesProvided from './AmenitiesProvided';
import HostelGallery from './HostelGallery';
import HostelRooms from './HostelRooms';
import HostelServices from './HostelServices';
interface Iprops {
  hostel: Hostel | undefined | null;
  checkInDate: string;
  checkOutDate: string;
}

export default function MainContent(props: Iprops) {
  const { hostel } = props;



  //socials
  const facebookUrl = hostel?.data?.social?.facebook ?? '#';
  const instagramUrl = hostel?.data?.social?.instaGram ?? '#';
  const youtubeUrl = hostel?.data?.social?.youTube ?? '#';

  // contact

  return (
    <div className="bg-gray-50 pb-4">
 
        <div className="container mx-auto">
          <BreadCrumbs name={hostel?.data?.name ?? ''} slug={hostel?.data?.slug} />
          <div className="box-border w-full lg:flex lg:gap-8 lg:px-10">
            <div className="box-border flex-grow overflow-x-hidden overflow-y-hidden rounded-xl bg-white p-3 shadow-sm md:p-4 md:px-4">
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{hostel?.data?.name}</h1>
                    <div className="mt-2 flex items-center text-gray-600">
                      <CiLocationOn className="mr-1 text-2xl text-secondary" />
                      <span className="text-lg">
                        {hostel?.data?.address?.city}, {hostel?.data?.address?.country}
                      </span>
                    </div>
                  </div>
              
                </div>
              </div>
              <div className="mb-2">
              <HostelGallery hostel={hostel}/>
                <div className="rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                  <h2 className=" text-2xl font-semibold text-gray-800">Description</h2>
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: hostel?.data?.description ?? '' }} />
                  </div>
                  </div>

                  {/* Rules section */}
                <div className="rounded-xl mt-4 rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                  <h2 className=" text-2xl font-semibold text-gray-800">Rules/Criteria</h2>
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: hostel?.data?.hostelRules?.rules.rules ?? '' }} />
                  </div>
                  </div>
              </div>
            </div>

            <div className="sticky top-[100px] m-3 lg:m-0 lg:min-w-[380px] lg:max-w-[380px]">
              <div className="space-y-6">
               <AmenitiesProvided hostelId={Number(hostel?.data?.id)} />


                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                    Contact Us
                  </h3>
                  <div className="flex flex-col items-start gap-0 md:flex-row md:gap-4 lg:flex-col lg:gap-0">
                    <div className="flex items-center gap-0">
                      <div className="bg-blue-50 text-blue-600 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                        <FaPhoneFlip className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {hostel?.data?.contact?.phone ?? 'No number'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-50 text-blue-600 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                        <MdEmail className="h-8 w-7 text-secondary lg:h-6 lg:w-6" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {hostel?.data?.contact?.email ?? 'No email'}
                      </p>
                    </div>
                    <div className="flex items-start md:ml-4 lg:ml-0">
                      <div className="mr-3 pt-2 font-medium text-gray-700">Socials:</div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={instagramUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <GrInstagram className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                        <a
                          href={facebookUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <FaFacebook className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                        <a
                          href={youtubeUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <GrYoutube className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                

                {/* Services Section */}
              <HostelServices hostel={hostel}/>


                <div className="rounded-xl bg-white p-6 pt-2 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Map On Google</h3>
                  <div className=" h-[450px] w-full overflow-y-hidden rounded-md">
                    <MapProvider>
                      {hostel?.data?.address?.latitude && hostel?.data?.address?.longitude && (
                          <MapComponent
                          lat={hostel.data.address.latitude}
                          lng={hostel.data.address.longitude}
                          description={hostel.data.name}
                        />
                      )}
                    </MapProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 w-[93vw] rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">Available Rooms</h2>
            
            </div>
           <HostelRooms hostel={hostel}/>
          </div>
        </div>
    
    
  
    </div>
  );
}
