import { MdOutlineFileUpload } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaImage, FaImages } from 'react-icons/fa';
import { BsCamera } from 'react-icons/bs';

export const HowItWorks = () => {
  return (
    <div className="container-group mb-20">
      <div className="mx-auto mb-[30px] text-center">
        <span className="font-display mb-2 block text-2xl font-semibold text-secondary">
          Get Started In Three Steps:
        </span>
        <h2 className="mb-4 text-2xl font-bold text-primary md:text-[36px]">
          Start designing your interior or exterior by following these 3 simple steps
        </h2>
      </div>
      <p className="font-display text-center text-[18px] font-medium text-secondary lg:text-[25px]">
        Start designing your interior or exterior by following these 3 simple steps
      </p>
      {/* <h2 className=" text-center text-[36px] font-bold text-primary lg:text-[50px]">
        How Does It Works?
      </h2>
      <p className=" text-center text-[18px] font-medium text-secondary lg:text-[25px]">
        Start designing your interior or exterior by following these 3 simple steps
      </p> */}
      <div className=" py-9">
        <div className="grid w-full gap-10 lg:grid-cols-3">
          <div className=" card min-h-[250px] rounded-lg border-[3px] border-opacity-50 p-9 shadow-sm">
            <div className=" pb-5 text-[36px] text-primary">
              <BsCamera />
            </div>
            <div>
              <p className=" text-[36px] font-semibold text-primary">Grab your camera</p>
            </div>
            <div>
              <p className=" text-9 text-[18px] font-medium">
                Upload your image of any room type, house or garden should be Upload pictures of any
                room, exterior or outdoor area
              </p>
            </div>
          </div>
          {/* second two */}
          <div className=" card min-h-[250px] rounded-lg border-[3px] border-opacity-50 p-9 shadow-sm">
            <div className=" pb-5 text-[36px] text-primary">
              <IoDocumentTextOutline />
            </div>
            <div>
              <p className=" text-[36px] font-semibold text-primary">Set the direction</p>
            </div>
            <div>
              <p className=" text-9 text-[18px] font-medium">
                Customize room type, AI strength, custom instructions, mode and design style should
                be Customize the room type, design style and fittings
              </p>
            </div>
          </div>

          {/* second three*/}
          <div className=" card min-h-[250px] rounded-lg border-[3px] border-opacity-50 p-9 shadow-sm">
            <div className=" pb-5 text-[36px] text-primary">
              <FaImage />
            </div>
            <div>
              <p className=" text-[36px] font-semibold text-primary">Rennovate</p>
            </div>
            <div>
              <p className=" text-9 text-[18px] font-medium">
                Generate new decoration and design ideas in less than 30 seconds should be Reimagine
                decoration and design ideas in seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
