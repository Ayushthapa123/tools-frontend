"use client";
import { useQuery } from "@tanstack/react-query";
import { GetAllHostelServices, GetAllHostelServicesQuery, GetAllHostelServicesQueryVariables } from "src/gql/graphql";
import { useGraphqlClientRequest } from "src/hooks/useGraphqlClientRequest";
import { createColumnHelper } from "@tanstack/react-table";
import ReactTable from "src/components/ReactTable";
import { useState } from "react";
import { Modal } from "src/components/Modal";
import { HostelServiceData } from "src/gql/graphql";
import SelectedServiceModal from "./SelectedServiceModal";

export default function MarketingDetails() {
  const [selectedService, setSelectedService] = useState<HostelServiceData | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  const queryHostelServices = useGraphqlClientRequest<GetAllHostelServicesQuery, GetAllHostelServicesQueryVariables>(
    GetAllHostelServices.loc?.source?.body!,
  );

  const fetchHostelServices = async () => {
    const res = await queryHostelServices();
    return res.getAllHostelServices;
  };

  const { data: hostelServices, isLoading, error } = useQuery({
    queryKey: ['getHostelServices'],
    queryFn: fetchHostelServices,
  });

  // Create column helper for React Table
  const columnHelper = createColumnHelper<any>();

  // Define table columns
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Service Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue() || "No description",
    }),
    columnHelper.accessor("hostelServiceType", {
      header: "Service Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      cell: (info) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          info.getValue() === 'HIGH' ? 'bg-red-100 text-red-800' :
          info.getValue() === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
          info.getValue() === 'LOW' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          info.getValue() === 'COMPLETED' ? 'bg-green-100 text-green-800' :
          info.getValue() === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
          info.getValue() === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("budget", {
      header: "Budget",
      cell: (info) => info.getValue() ? `Nrs. ${info.getValue()}` : "N/A",
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : "N/A",
    }),
    columnHelper.accessor("completionDate", {
      header: "Completion Date",
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : "N/A",
    }),
    columnHelper.accessor("createdAt", {
      header: "Created Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("hostel.name", {
      header: "Hostel Name",
      cell: (info) => info.getValue() || "N/A",
    }),
    columnHelper.accessor("", {
      header: "Actions",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              setSelectedService(info.row.original);
              setShowServiceModal(true);
            }}
          >
            View
          </button>
        </div>
      ),
    }),
  ];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading hostel services: {error.message}</span>
      </div>
    );
  }

  // Get the data array from the response
  const tableData = hostelServices?.data || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">Marketing Details</h1>
        <p className="text-gray-600">Manage and view all hostel services and marketing activities</p>
      </div>

      <ReactTable
        tableData={tableData}
        columnData={columns}
        totalRows={tableData.length}
        isLoading={isLoading}
        showImport={false}
        showExport={true}
        showSearch={true}
        paginationVisible={true}
        withMinHeight={false}
        withPagination={true}
      />

      {/* Service Detail Modal */}
      {selectedService && (
        <SelectedServiceModal
          showServiceModal={showServiceModal}
          setShowServiceModal={setShowServiceModal}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      )}
    </div>
  );
}