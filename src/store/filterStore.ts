
import { create } from 'zustand';
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

export interface FilterState {
  // Search and basic filters
  searchQuery: string;
  researchMode: boolean;
  
  // Date filters
  startDate: string | null;
  endDate: string | null;
  
  // Categorical filters
  aiTypes: AiType[];
  domains: Domain[];
  pricingTypes: PricingType[];
  modalities: Modality[];
  platforms: PlatformType[];
  deliveryMethods: Delivery[];
  integrationOptions: IntegrationOption[];
  toolUserTypes: ToolUserType[];
  aiCapabilities: AiCapability[];
  
  // Boolean filters
  featuredOnly: boolean;
  verifiedOnly: boolean;
  
  // Numeric filters
  minPopularityScore: number;
  maxPopularityScore: number;
  
  // UI state
  isFilterModalOpen: boolean;
}

export interface FilterActions {
  // Search actions
  setSearchQuery: (query: string) => void;
  setResearchMode: (enabled: boolean) => void;
  
  // Date actions
  setDateRange: (startDate: string, endDate: string) => void;
  clearDateRange: () => void;
  
  // Categorical filter actions
  setAiTypes: (types: AiType[]) => void;
  setDomains: (domains: Domain[]) => void;
  setPricingTypes: (types: PricingType[]) => void;
  setModalities: (modalities: Modality[]) => void;
  setPlatforms: (platforms: PlatformType[]) => void;
  setDeliveryMethods: (methods: Delivery[]) => void;
  setIntegrationOptions: (options: IntegrationOption[]) => void;
  setToolUserTypes: (types: ToolUserType[]) => void;
  setAiCapabilities: (capabilities: AiCapability[]) => void;
  
  // Boolean filter actions
  setFeaturedOnly: (featured: boolean) => void;
  setVerifiedOnly: (verified: boolean) => void;
  
  // Numeric filter actions
  setPopularityRange: (min: number, max: number) => void;
  
  // UI actions
  setFilterModalOpen: (open: boolean) => void;
  
  // Utility actions
  clearAllFilters: () => void;
  getActiveFilterCount: () => number;
}

const initialState: FilterState = {
  searchQuery: '',
  researchMode: true,
  startDate: null,
  endDate: null,
  aiTypes: [],
  domains: [],
  pricingTypes: [],
  modalities: [],
  platforms: [],
  deliveryMethods: [],
  integrationOptions: [],
  toolUserTypes: [],
  aiCapabilities: [],
  featuredOnly: false,
  verifiedOnly: false,
  minPopularityScore: 0,
  maxPopularityScore: 100,
  isFilterModalOpen: false,
};

export const useFilterStore = create<FilterState & FilterActions>()((set, get) => ({
  ...initialState,
  
  // Search actions
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setResearchMode: (enabled: boolean) => set({ researchMode: enabled }),
  
  // Date actions
  setDateRange: (startDate: string, endDate: string) => set({ startDate, endDate }),
  clearDateRange: () => set({ startDate: null, endDate: null }),
  
  // Categorical filter actions
  setAiTypes: (types: AiType[]) => set({ aiTypes: types }),
  setDomains: (domains: Domain[]) => set({ domains }),
  setPricingTypes: (types: PricingType[]) => set({ pricingTypes: types }),
  setModalities: (modalities: Modality[]) => set({ modalities }),
  setPlatforms: (platforms: PlatformType[]) => set({ platforms }),
  setDeliveryMethods: (methods: Delivery[]) => set({ deliveryMethods: methods }),
  setIntegrationOptions: (options: IntegrationOption[]) => set({ integrationOptions: options }),
  setToolUserTypes: (types: ToolUserType[]) => set({ toolUserTypes: types }),
  setAiCapabilities: (capabilities: AiCapability[]) => set({ aiCapabilities: capabilities }),
  
  // Boolean filter actions
  setFeaturedOnly: (featured: boolean) => set({ featuredOnly: featured }),
  setVerifiedOnly: (verified: boolean) => set({ verifiedOnly: verified }),
  
  // Numeric filter actions
  setPopularityRange: (min: number, max: number) => set({ 
    minPopularityScore: min, 
    maxPopularityScore: max 
  }),
  
  // UI actions
  setFilterModalOpen: (open: boolean) => set({ isFilterModalOpen: open }),
  
  // Utility actions
  clearAllFilters: () => set({
    ...initialState,
    searchQuery: get().searchQuery, // Keep search query
    researchMode: get().researchMode, // Keep research mode
  }),
  
  getActiveFilterCount: () => {
    const state = get();
    let count = 0;
    
    // Count non-empty arrays
    if (state.aiTypes.length > 0) count++;
    if (state.domains.length > 0) count++;
    if (state.pricingTypes.length > 0) count++;
    if (state.modalities.length > 0) count++;
    if (state.platforms.length > 0) count++;
    if (state.deliveryMethods.length > 0) count++;
    if (state.integrationOptions.length > 0) count++;
    if (state.toolUserTypes.length > 0) count++;
    if (state.aiCapabilities.length > 0) count++;
    
    // Count boolean filters
    if (state.featuredOnly) count++;
    if (state.verifiedOnly) count++;
    
    // Count date filters
    if (state.startDate || state.endDate) count++;
    
    // Count popularity range if not default
    if (state.minPopularityScore !== 0 || state.maxPopularityScore !== 100) count++;
    
    return count;
  },
}));
