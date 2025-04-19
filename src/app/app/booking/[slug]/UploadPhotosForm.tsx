import Button from "src/components/Button";

const UploadPhotos = ({ handleBack }: { handleBack: () => void }) => {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Upload Room Photos</h3>
          <p className="text-gray-500">Coming soon...</p>
        </div>
        <Button
            type="button"
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            label="Back"
            onClick={handleBack}
          />
      </div>
    );
  };

export default UploadPhotos;