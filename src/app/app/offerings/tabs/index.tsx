import Button from "src/components/Button";
import { useState } from "react";
import RequestServiceModal from "../RequestServiceModal";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DeleteServiceModal from "../DeleteServiceModal";

const ServiceTab = ({tabName,tabServices,hostelId}:{tabName:string,tabServices:any[],hostelId:number|null}) => {
  const [ showRequestServiceModal, setShowRequestServiceModal ] = useState(false);
  const [ showEditServiceModal, setShowEditServiceModal ] = useState(false);
  const [ showDeleteServiceModal, setShowDeleteServiceModal ] = useState(false);
  const [ selectedServiceId, setSelectedServiceId ] = useState<number | null>(null);

  const handleEditService = (serviceId:number) => {
    setShowEditServiceModal(true);
    setSelectedServiceId(serviceId);
  }

  const handleDeleteService = (serviceId:number) => {
    setShowDeleteServiceModal(true);
    setSelectedServiceId(serviceId);
  }
  console.log("selectedServiceId", selectedServiceId);

  return (
    <div>
       <div className="w-full flex  justify-end">
      <div className="flex w-fit">
        <Button label="Request Service" onClick={()=>setShowRequestServiceModal(true)} />
      </div>
      </div>
      
      { tabServices.length  ? (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Completion Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tabServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {service.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {service.description || 'No description available'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      service.status === 'completed' ? 'bg-green-100 text-green-800' :
                      service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.budget ? `Nrs. ${service.budget}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.dueDate ? new Date(service.dueDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.completionDate ? new Date(service.completionDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                    <button onClick={()=>handleEditService(service.id)}>
                    <FaRegEdit className="text-2xl text-primary" />
                    </button>
                    <button onClick={()=>handleDeleteService(service.id)}>
                    <MdDelete className="text-2xl text-red" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32 mt-4">
          <p className="text-red text-lg">No services requested yet.</p>
        </div>
      )}
      
        {showRequestServiceModal && <RequestServiceModal serviceId={null} hostelId={Number(hostelId)} isOpen={showRequestServiceModal} onClose={()=>setShowRequestServiceModal(false)} serviceName={tabName} />}
        {showEditServiceModal && <RequestServiceModal serviceId={selectedServiceId ?? 0} hostelId={Number(hostelId)} isOpen={showEditServiceModal} onClose={()=>{setShowEditServiceModal(false); setSelectedServiceId(null)}} serviceName={tabName} />}
        {showDeleteServiceModal && <DeleteServiceModal serviceId={selectedServiceId ?? 0} isOpen={showDeleteServiceModal} onClose={()=>{setShowDeleteServiceModal(false); setSelectedServiceId(null)}} serviceName={tabName} />}
    </div>
  );
};

export default ServiceTab;