import Button from "src/components/Button";
import { RoomImage } from "src/gql/graphql";
import { PhotoGallery } from "./gallery/PhotoGallery";

const UploadPhotos = ({ handleBack, handleNext , roomImages, roomId }: { handleBack: () => void, handleNext: () => void, roomImages: RoomImage[], roomId: number }) => {

  const isEdit = roomImages.length > 0;
  return (
    <div className="space-y-4">
      <div className="text-center">
        <PhotoGallery galleryType="ROOM" galleryKey="getRoomImages" roomId={roomId} />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between ">
          <div>
            <Button
              type="button"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              label="Back"
              onClick={handleBack}
            />
          </div>
          <div>
            <Button
              type="button"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              label="Next"
              onClick={handleNext}
            />
          </div>
        </div>
        <div className="justify-end flex-1 w-full flex-grow"></div>
        <div className="flex gap-2">

        </div>
      </div>
    </div>
  );
};

export default UploadPhotos;