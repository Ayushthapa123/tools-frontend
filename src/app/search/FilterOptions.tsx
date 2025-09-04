'use client';

import React, { Suspense, useEffect } from 'react';
import FilterIcon from 'src/components/icons/Filter';
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
  AiCapability
} from 'src/gql/graphql';
import { useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useSearchParams } from 'next/navigation';
import { extractEnums } from 'src/utils/extractEnums';

interface FilterOptionsProps {
  onFiltersChange?: () => void;
}

export default function FilterOptions({ onFiltersChange }: FilterOptionsProps) {
  return (
    <Suspense fallback={<LoadingSpinner color="primary" size="lg" />}>
      <FilterOptionsComponent onFiltersChange={onFiltersChange} />
    </Suspense>
  );
};


 function FilterOptionsComponent({ onFiltersChange }: FilterOptionsProps) {
  const query = useSearchParams();
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
    setFeaturedOnly,
    setVerifiedOnly,
    setPopularityRange,
    clearAllFilters,
    getActiveFilterCount
  } = useFilterStore();

  const activeFilterCount = getActiveFilterCount();

  // Notify parent component when filters change
  useEffect(() => {
    onFiltersChange?.();
  }, [
    aiTypes, domains, pricingTypes, modalities, platforms, deliveryMethods,
    integrationOptions, toolUserTypes, aiCapabilities, featuredOnly, verifiedOnly,
    startDate, endDate, minPopularityScore, maxPopularityScore, onFiltersChange
  ]);

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleResearchModeToggle = () => {
    setResearchMode(!researchMode);
  };

const queryClient = useQueryClient();

  const handleApplyFilters = () => {
    queryClient.refetchQueries({ queryKey: ['searchListedAiTools'],type:"all" }); 
    setFilterModalOpen(false);
    onFiltersChange?.();
  };

  const handleClearFilters = () => {
    queryClient.refetchQueries({ queryKey: ['searchListedAiTools'],type:"all" }); 
    clearAllFilters();
    window.location.reload();
    onFiltersChange?.();
  };

  const closeModal = () => {
    setFilterModalOpen(false);
  }; 

  const searchQuery = query.get('query');
  const x = extractEnums(searchQuery ?? '');

  return (
    <>
      <div className="flex items-center justify-between w-full p-3 gap-4">
        <button
          onClick={handleFilterClick}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          type="button"
          aria-label="Open filter options"
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary text-white text-xs px-2 py-1 min-w-[20px] text-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        <div className="flex items-center gap-3">
          <label className="label cursor-pointer flex items-center gap-2">
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
        <div className="modal-box w-full max-w-7xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-base-100 rounded-md z-10 pb-4 border-b border-base-300 mb-6">
            <h3 className="font-bold text-xl mb-2">AI Tool Filters</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {activeFilterCount > 0 ? `${activeFilterCount} filters applied` : 'No filters applied'}
              </p>
              {activeFilterCount > 0 && (
                <button
                  className="btn btn-sm btn-outline"
                  onClick={handleClearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Core Filters */}
            <div className="grid grid-cols-1  gap-6">
              {/* AI Type */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">AI Type</h4>
                <Checklist
                  label=""
                  items={enumToOptions(AiType)}
                  onChange={(selected) => setAiTypes(selected as AiType[])}
                  defaultValue={[...aiTypes, ...x.aiType]}
                />
              </div>

              {/* Domains */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Domains</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Domain)}
                  onChange={(selected) => setDomains(selected as Domain[])}
                  defaultValue={[...domains, ...x.domain]}
                />
              </div>
            </div>

            {/* Business Model */}
            <div className="grid grid-cols-1  gap-6">
              {/* Pricing Type */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Pricing Model</h4>
                <Checklist
                  label=""
                  items={enumToOptions(PricingType)}
                  onChange={(selected) => setPricingTypes(selected as PricingType[])}
                  defaultValue={[...pricingTypes, ...x.pricingType]}
                />
              </div>

              {/* Delivery Methods */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Delivery Methods</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Delivery)}
                  onChange={(selected) => setDeliveryMethods(selected as Delivery[])}
                  defaultValue={[...deliveryMethods,...x.deliveryMethod]}
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="grid grid-cols-1  gap-6">
              {/* Modalities */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Modalities</h4>
                <Checklist
                  label=""
                  items={enumToOptions(Modality)}
                  onChange={(selected) => setModalities(selected as Modality[])}
                  defaultValue={[...modalities,...x.modality]}
                />
              </div>

              {/* Platforms */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Platforms</h4>
                <Checklist
                  label=""
                  items={enumToOptions(PlatformType)}
                  onChange={(selected) => setPlatforms(selected as PlatformType[])}
                  defaultValue={[...platforms,...x.platform]}
                />
              </div>
            </div>

            {/* Integration & Users */}
            <div className="grid grid-cols-1  gap-6">
              {/* Integration Options */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Integration Options</h4>
                <Checklist
                  label=""
                  items={enumToOptions(IntegrationOption)}
                  onChange={(selected) => setIntegrationOptions(selected as IntegrationOption[])}
                  defaultValue={[...integrationOptions]}
                />
              </div>

              {/* Target Users */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Target Users</h4>
                <Checklist
                  label=""
                  items={enumToOptions(ToolUserType)}
                  onChange={(selected) => setToolUserTypes(selected as ToolUserType[])}
                  defaultValue={[...toolUserTypes, ...x.toolUserType]}
                />
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">AI Capabilities</h4>
              <Checklist
                label=""
                items={enumToOptions(AiCapability)}
                onChange={(selected) => setAiCapabilities(selected as AiCapability[])}
                defaultValue={[...aiCapabilities, ...x.aiCapability]}
              />
            </div>

            {/* Quality Filters */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Quality Filters</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
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
              <h4 className="font-semibold text-lg">Popularity Score</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm w-12">Min:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minPopularityScore}
                    onChange={(e) => setPopularityRange(Number(e.target.value), maxPopularityScore)}
                    className="range range-primary flex-1"
                  />
                  <span className="text-sm w-12">{minPopularityScore}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm w-12">Max:</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={maxPopularityScore}
                    onChange={(e) => setPopularityRange(minPopularityScore, Number(e.target.value))}
                    className="range range-primary flex-1"
                  />
                  <span className="text-sm w-12">{maxPopularityScore}</span>
                </div>
              </div>
            </div>

            {/* Date Filters */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Published Date</h4>
              <div className="grid grid-cols-1  gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={startDate ?? ''}
                    onChange={(e) => setDateRange(e.target.value, endDate ?? '')}
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
                    onChange={(e) => setDateRange(startDate ?? '', e.target.value)}
                    placeholder="Select end date"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-base-100 pt-6 mt-8 border-t border-base-300">
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-ghost"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleApplyFilters}
              >
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
