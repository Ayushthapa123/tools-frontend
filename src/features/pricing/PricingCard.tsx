import Button from "src/components/Button";
import StarIcon from "src/components/icons/Add";

interface PricingCardProps {
  planType: string;
  planFor: string;
  monthlyPrice: number;
  features: string[];
  ctaText: string;
  index: number;
}

export const PricingCard = (props: PricingCardProps) => {
  const {index, planType, planFor, monthlyPrice, features, ctaText } = props;
  return (
    <>
      <div className="relative">
      <div className={`relative z-10 p-4 border border-gray-200 bg-white rounded-2xl  transition-all ease-in-out duration-150 ${index==1 ? "min-h-[470px]":" min-h-[450px] hover:border-primary/60"}`}>
        <div>
          <h2 className="text-4xl font-bold mb-1">{planType}</h2>
          <span className="text-gray-700 ">For {planFor}</span>
        </div>  
        <div className="mt-4 mb-2 flex gap-2 items-center">
          <h2 className="text-5xl text-bold">Nrs. {monthlyPrice}</h2>
          <span className="text-gray-500 font-semibold">per month</span>
        </div>
        <hr />
        <div className={`flex flex-col ${index==1?"gap-12":"gap-8"} `}>
        <div className="mt-4 px-2">
          <p className="font-semibold">What&apos;s included: </p>
          {
            features.map((item, index) => {
              return (
                <div key={index} className="flex items-start gap-2 ml-2">
                  <StarIcon className="text-yellow-400 text-xl" />
                  <p className="mb-1 pb-2 text-gray-700 font-medium">{item}</p>
                </div>
              )
            })
          }
        </div>
        <div className="w-full">
          <Button label={ctaText} className="text-white" />
        </div>
        </div>
        </div>
        <div className={` ${index==1?"block":"hidden"} absolute inset-0 z-0 rounded-2xl rounded-t-4xl -top-10 -left-2 -right-2 -bottom-2 animate-[subtle-neon_3s_infinite]  bg-blue border border-blue w-[calc(100%+1rem)] h-[calc(100%+3rem)]`}>
          <div className="text-center mt-[7px]">
               <span className="text-gray-200 text-center font-semibold">Recommended for you</span>
          </div>
        </div>
        </div>
    </>
  )
}