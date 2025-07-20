import { Modal } from "src/components/Modal";

export default function SelectedServiceModal({ showServiceModal, setShowServiceModal, selectedService, setSelectedService }: { showServiceModal: boolean, setShowServiceModal: (show: boolean) => void, selectedService: any, setSelectedService: (service: any) => void }) {
  const handleSave = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  }
  return <Modal
  open={showServiceModal}
  handleClose={() => {
    setShowServiceModal(false);
    setSelectedService(null);
  }}
  title="Service Details"
    className="max-w-4xl"
    actionLabel="Done"
    onSave={handleSave}
>
  {selectedService && (
    <div className="space-y-6">
      {/* Service Header */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-primary">{selectedService.title}</h2>
        <p className="text-gray-600 mt-2">{selectedService.description || "No description available"}</p>
      </div>

      {/* Service Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Basic Information</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Service ID:</span>
              <span className="text-gray-900">{selectedService.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Service Type:</span>
              <span className="text-gray-900">{selectedService.hostelServiceType}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Priority:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                selectedService.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                selectedService.priority === 'MID' ? 'bg-yellow-100 text-yellow-800' :
                selectedService.priority === 'LOW' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedService.priority}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Status:</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                selectedService.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                selectedService.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                selectedService.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedService.status}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Budget:</span>
              <span className="text-gray-900">
                {selectedService.budget ? `Nrs. ${selectedService.budget}` : "Not specified"}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Timeline</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Created Date:</span>
              <span className="text-gray-900">
                {new Date(selectedService.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Due Date:</span>
              <span className="text-gray-900">
                {selectedService.dueDate ? new Date(selectedService.dueDate).toLocaleDateString() : "Not set"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Completion Date:</span>
              <span className="text-gray-900">
                {selectedService.completionDate ? new Date(selectedService.completionDate).toLocaleDateString() : "Not completed"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hostel Information */}
      {selectedService.hostel && (
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Hostel Information</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Hostel Name:</span>
              <span className="text-gray-900 font-semibold">{selectedService.hostel.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Additional Details */}
        <div className="bg-gray-50 w-fit absolute top-0  right-4 rounded-lg p-1">
          <div className="flex justify-between">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              selectedService.isDeleted ? ' text-red' : 'bg-green-100 text-green'
            }`}>
              {selectedService.isDeleted ? 'Deleted' : 'Active'}
            </span>
        </div>
        </div>
        
    </div>
  )}
</Modal>;
}