import RoomContainer from "./RoomContainer";

    
export default function Home({ params }: { params: { slug: string } }) {

 
  return (
    <div className="w-full ">
       <RoomContainer params={params} />
    </div>
  );
}
