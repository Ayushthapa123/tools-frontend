import Button from "src/components/Button";
import { RoomImage } from "src/gql/graphql";
import { PhotoGallery } from "./gallery/PhotoGallery";

const UploadPhotos = ({ handleBack,roomImages,roomId }: { handleBack: () => void,roomImages: RoomImage[],roomId: number }) => {

  const isEdit = roomImages.length > 0;
    return (
      <div className="space-y-4">
        <div className="text-center">
          <PhotoGallery galleryType="ROOM" galleryKey="getRoomImages" roomId={roomId} />
        </div>
        <div className="flex justify-between mt-7 relative ">
            <div className="flex">
            <Button
              type="button"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              label="Back"
              onClick={handleBack}
            />
            </div>
            <div className="justify-end flex-1 w-full flex-grow"></div>
            <div className="flex gap-2">
         
            </div>
          </div>
      </div>
    );
  };

export default UploadPhotos;