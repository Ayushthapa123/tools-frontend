import Image from "next/image";

export const OfferCard = ({ title, description, imagePath ,index}: { title: string, description: string, imagePath  : string ,index:number}) => {
  return (
    <div className={`bg-white rounded-xl border  p-4 shadow-lg  ${index === 2 ? 'min-h-[470px] border-gray-300' : 'min-h-[400px] border-gray-200'} hover:border-blue transition-all duration-100`}>
      <div className="flex flex-col items-center justify-between min-h-[420px]">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-600">{title}</h2>
          <Image src={imagePath} alt={title} width={200} height={200} />
        </div>
        <div>
          <p className="text-gray-500 font-medium text-center text-xl tracking-wide">{description}</p>
        </div>
      </div>
    </div>
  );
};
