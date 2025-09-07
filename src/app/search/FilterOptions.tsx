'use client';

import React, { Suspense, useEffect, useState, useCallback } from 'react';
import FilterIcon from 'src/components/icons/Filter';
import RemoveIcon from 'src/components/icons/Remove';
import { useFilterStore } from 'src/store/filterStore';
import Checklist from 'src/components/CheckList';
import { enumToOptions } from 'src/utils/enumToArray';
import {
  AiType,
  Domain,
  PricingType,
  Modality,
  PlatformType,
  Delivery,
  IntegrationOption,
  ToolUserType,
  AiCapability,
  ProductType,
} from 'src/gql/graphql';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useSearchParams, useRouter } from 'next/navigation';
import { extractEnums } from 'src/utils/extractEnums';

export default function FilterOptions() {
  return (
    <Suspense fallback={<LoadingSpinner color="primary" size="lg" />}>
      <FilterOptionsComponent />
    </Suspense>
  );
}

function FilterOptionsComponent() {
  const query = useSearchParams();
  const router = useRouter();
  const {
    // State
    researchMode,
    isFilterModalOpen,
    startDate,
    endDate,
    aiTypes,
    domains,
    pricingTypes,
    modalities,
    platforms,
    deliveryMethods,
    integrationOptions,
    toolUserTypes,
    aiCapabilities,
    featuredOnly,
    verifiedOnly,
    minPopularityScore,
    maxPopularityScore,
    productTypes,
    // Actions
    setResearchMode,
    setFilterModalOpen,
    setDateRange,
    setAiTypes,
    setDomains,
    setPricingTypes,
    setModalities,
    setPlatforms,
    setDeliveryMethods,
    setIntegrationOptions,
    setToolUserTypes,
    setAiCapabilities,
    setProductTypes,
    setFeaturedOnly,
    setVerifiedOnly,
    setPopularityRange,
    clearAllFilters,
  } = useFilterStore();

  const searchQuery = query.get('query');
  const x = extractEnums(searchQuery ?? '');


  const getActiveFilterCount = useCallback(() => {
    let count = 0;

    // Count non-empty arrays
    if (aiTypes.length + x.aiType.length  > 0) count++;
    if (domains.length > 0) count++;
    if (pricingTypes.length + x.pricingType.length > 0) count++;
    if (modalities.length + x.modality.length > 0) count++;
    if (platforms.length + x.platform.length > 0) count++;
    if (deliveryMethods.length + x.deliveryMethod.length > 0) count++;
    if (integrationOptions.length > 0) count++;
    if (toolUserTypes.length + x.toolUserType.length > 0) count++;
    if (aiCapabilities.length + x.aiCapability.length > 0) count++;
    if (productTypes.length + x.productType.length > 0) count++;

    // Count boolean filters
    if (featuredOnly) count++;
    if (verifiedOnly) count++;

    // Count date filters
    if (startDate || endDate) count++;

    // Count popularity range if not default
    if (minPopularityScore !== 0 || maxPopularityScore !== 100) count++;

    return count;
  }, [aiTypes, domains, pricingTypes, modalities, platforms, deliveryMethods, integrationOptions, toolUserTypes, aiCapabilities, productTypes, featuredOnly, verifiedOnly, startDate, endDate, minPopularityScore, maxPopularityScore, x]);

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleResearchModeToggle = () => {
    setResearchMode(!researchMode);
  };

  const queryClient = useQueryClient();

  const handleApplyFilters = () => {
    queryClient.refetchQueries({ queryKey: ['searchListedAiTools'], type: 'all' });
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    queryClient.refetchQueries({ queryKey: ['searchListedAiTools'], type: 'all' });
    clearAllFilters();
    queryClient.refetchQueries({ queryKey: ['searchListedAiTools'], type: 'all' });

  };

  const handleClearFiltersAndNavigate = () => {

    router.push('/search'); 

    setTimeout(() => {
      window.location.reload();
    }, 100);
  
    // window.location.reload();

    
  };

  const closeModal = () => {
    setFilterModalOpen(false);
  };


  const [activeFilterCount, setActiveFilterCount] = useState(0);

  useEffect(() => {
    setActiveFilterCount(getActiveFilterCount());
  }, [getActiveFilterCount]);

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleFilterClick}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            type="button"
            aria-label="Open filter options">
            <FilterIcon className="h-4 w-4" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 min-w-[20px] rounded-full bg-primary px-2 py-1 text-center text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFiltersAndNavigate}
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm transition-colors hover:border-red-400 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
              aria-label="Clear all filters"
              title="Clear all filters">
              <RemoveIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <label className="label flex cursor-pointer items-center gap-2">
            <span className="label-text text-sm font-medium">Research Mode</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={researchMode}
              onChange={handleResearchModeToggle}
              aria-label="Toggle research mode"
            />
          </label>
        </div>
      </div>

      {/* Comprehensive Filter Modal */}
      <div className={`modal ${isFilterModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box max-h-[90vh] w-full max-w-7xl overflow-y-auto">
          <div className="sticky top-0 z-10 mb-6 rounded-md border-b border-base-300 bg-base-100 pb-4">
            <h3 className="mb-2 text-xl font-bold">AI Tool Filters</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {activeFilterCount > 0
                  ? `${activeFilterCount} filters applied`
                  : 'No filters applied'}
              </p>
              {activeFilterCount > 0 && (
                <button className="btn btn-outline btn-sm" onClick={handleClearFilters}>
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Core Filters */}
            <div className="grid grid-cols-1  gap-6">
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Product Type</h4>
                <Checklist
                  label=""
                  items={enumToOptions(ProductType)}
                  onChange={selected => setProductTypes(selected as ProductType[])}
                  defaultValue={[...productTypes, ...x.productType]}
                />
              </div>
              {/* AI Type */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">AI Type</h4>
                <Checklist
                  label=""
                  items={enumToOptions(AiType)}
                  onChange={selected => setAiTypes(selected as AiType[])}
                  defaultValue={[...aiTypes, ...x.aiType]}
                />
              </div>

              {/* Domains */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Domains</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Domain)}
                  onChange={selected => setDomains(selected as Domain[])}
                  defaultValue={[...domains, ...x.domain]}
                />
              </div>
            </div>

            {/* Business Model */}
            <div className="grid grid-cols-1  gap-6">
              {/* Pricing Type */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Pricing Model</h4>
                <Checklist
                  label=""
                  items={enumToOptions(PricingType)}
                  onChange={selected => setPricingTypes(selected as PricingType[])}
                  defaultValue={[...pricingTypes, ...x.pricingType]}
                />
              </div>

              {/* Delivery Methods */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Delivery Methods</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Delivery)}
                  onChange={selected => setDeliveryMethods(selected as Delivery[])}
                  defaultValue={[...deliveryMethods, ...x.deliveryMethod]}
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1  gap-6">
              {/* Modalities */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Modalities</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Modality)}
                  onChange={selected => setModalities(selected as Modality[])}
                  defaultValue={[...modalities, ...x.modality]}
                />
              </div>

              {/* Platforms */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Platforms</h4>
                <Checklist
                  label=""
                  items={enumToOptions(PlatformType)}
                  onChange={selected => setPlatforms(selected as PlatformType[])}
                  defaultValue={[...platforms, ...x.platform]}
                />
              </div>
            </div>

            {/* Integration & Users */}
            <div className="grid grid-cols-1  gap-6">
              {/* Integration Options */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Integration Options</h4>
                <Checklist
                  label=""
                  items={enumToOptions(IntegrationOption)}
                  onChange={selected => setIntegrationOptions(selected as IntegrationOption[])}
                  defaultValue={[...integrationOptions]}
                />
              </div>

              {/* Target Users */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold">Target Users</h4>
                <Checklist
                  label=""
                  items={enumToOptions(ToolUserType)}
                  onChange={selected => setToolUserTypes(selected as ToolUserType[])}
                  defaultValue={[...toolUserTypes, ...x.toolUserType]}
                />
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold">AI Capabilities</h4>
              <Checklist
                label=""
                items={enumToOptions(AiCapability)}
                onChange={selected => setAiCapabilities(selected as AiCapability[])}
                defaultValue={[...aiCapabilities, ...x.aiCapability]}
              />
            </div>

            {/* Quality Filters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quality Filters</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                    checked={featuredOnly}
                    onChange={e => setFeaturedOnly(e.target.checked)}
                  />
                  <span className="text-sm">Featured Only</span>
                </label>
                {/* <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <span className="text-sm">Verified Only</span>
                </label> */}
              </div>
            </div>

            {/* Popularity Score Range */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Popularity Score</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm">Min:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minPopularityScore}
                    onChange={e => setPopularityRange(Number(e.target.value), maxPopularityScore)}
                    className="range range-primary flex-1"
                  />
                  <span className="w-12 text-sm">{minPopularityScore}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm">Max:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={maxPopularityScore}
                    onChange={e => setPopularityRange(minPopularityScore, Number(e.target.value))}
                    className="range range-primary flex-1"
                  />
                  <span className="w-12 text-sm">{maxPopularityScore}</span>
                </div>
              </div>
            </div>

            {/* Date Filters */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Published Date</h4>
              <div className="grid grid-cols-1  gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={startDate ?? ''}
                    onChange={e => setDateRange(e.target.value, endDate ?? '')}
                    placeholder="Select start date"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={endDate ?? ''}
                    onChange={e => setDateRange(startDate ?? '', e.target.value)}
                    placeholder="Select end date"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mt-8 border-t border-base-300 bg-base-100 pt-6">
            <div className="flex justify-end gap-3">
              <button className="btn btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                Apply Filters
                {activeFilterCount > 0 && ` (${activeFilterCount})`}
              </button>
            </div>
          </div>
        </div>

        {/* Modal backdrop - clicking outside closes modal */}
        <div className="modal-backdrop" onClick={closeModal}></div>
      </div>
    </>
  );
}
