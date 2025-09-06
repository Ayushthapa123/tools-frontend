import { AiCapability, AiType, Delivery, Domain, Modality, PlatformType, PricingType, ProductType, ToolUserType } from "src/gql/graphql";

type ExtractedEnums = {
    domain: Domain[];
    toolUserType: ToolUserType[];
    aiType: AiType[];
    aiCapability: AiCapability[]; 
    pricingType: PricingType[];
    deliveryMethod: Delivery[];
    keywords: string[];
    modality: Modality[];
    platform: PlatformType[]; 
    productType: ProductType[];
  };
  
  export function extractEnums(sentence: string): ExtractedEnums {
    const normalized = sentence.toLowerCase();
  
    // --- Keyword maps ---
    const domainMap: Record<string, Domain> = {
      agriculture: Domain.Agriculture,
      education: Domain.Education,
      healthcare: Domain.Healthcare,
      finance: Domain.Finance,
      marketing: Domain.Marketing,
      security: Domain.Security,
      development: Domain.Development,
      research: Domain.Research,
      business: Domain.Business,
      design: Domain.Design,
      entertainment: Domain.Entertainment,
      gaming: Domain.Gaming,
      productivity: Domain.Productivity,
      writing: Domain.Writing,
      automation: Domain.Automation,
      sales: Domain.Sales,
      "customer support": Domain.CustomerSupport,
    };
  
    const userTypeMap: Record<string, ToolUserType> = {
      student: ToolUserType.Student,
      teacher: ToolUserType.Teacher,
      researcher: ToolUserType.Researcher,
      developer: ToolUserType.Developer,
      engineer: ToolUserType.SoftwareEngineer,
      scientist: ToolUserType.DataScientist,
      doctor: ToolUserType.HealthcareProfessional,
      lawyer: ToolUserType.LegalProfessional,
      marketer: ToolUserType.Marketer,
      designer: ToolUserType.Designer,
      writer: ToolUserType.Writer,
    };
  
    const aiTypeMap: Record<string, AiType> = {
      "generative ai": AiType.GenerativeAi,
      "conversational ai": AiType.ConversationalAi,
      "chatbot": AiType.ConversationalAi,
      "computer vision": AiType.ComputerVision,
      "speech ai": AiType.SpeechAi,
      "recommendation ai": AiType.RecommendationAi,
      "automation ai": AiType.AutomationAi,
      "analytics ai": AiType.AnalyticsAi,
      "search ai": AiType.SearchRetrievalAi,
      "retrieval": AiType.SearchRetrievalAi,
      "code ai": AiType.CodeAi,
      "marketing ai": AiType.MarketingAi,
      "security ai": AiType.SecurityAi,
    };
  
    const aiCapMap: Record<string, AiCapability> = {
      "text generation": AiCapability.GenerativeText,
      "image generation": AiCapability.GenerativeImage,
      "video generation": AiCapability.GenerativeVideo,
      "audio generation": AiCapability.GenerativeAudio,
      "multimodal": AiCapability.MultimodalUnderstanding,
      "nlp": AiCapability.NlpUnderstanding,
      "search": AiCapability.SearchRetrieval,
      "knowledge": AiCapability.KnowledgeAi,
      "ocr": AiCapability.OcrDocumentAi,
      "speech to text": AiCapability.SpeechAsr,
      "asr": AiCapability.SpeechAsr,
      "tts": AiCapability.SpeechTts,
      "recommendation": AiCapability.Recommendation,
      "forecasting": AiCapability.TimeSeriesForecasting,
      "analytics": AiCapability.AnalyticsBi,
      "optimization": AiCapability.OptimizationPlanning,
      "anomaly": AiCapability.AnomalyDetection,
      "code": AiCapability.CodeAi,
      "security": AiCapability.SecurityMl,
      "robotics": AiCapability.RoboticsControl,
      "edge": AiCapability.EdgeAi,
    };

    const pricingTypeMap: Record<string, PricingType> = {
      "free": PricingType.Free,
      "paid": PricingType.Paid,
      "freemium": PricingType.Freemium,
      "custom": PricingType.Custom,
      "trial": PricingType.Trial,
    };
    const deliveryMethodMap: Record<string, Delivery> = {
      "api": Delivery.Api,
      "edge": Delivery.EdgeDevice,
      "marketplace": Delivery.MarketplacePlugin,
      "model": Delivery.ModelWeights,
      "onprem": Delivery.OnPrem,
      "open": Delivery.OpenSource,
      "saas": Delivery.Saas,
      "sdk": Delivery.Sdk,
    };

    const modalityMap: Record<string, Modality> = {
      "text": Modality.Text,
      "audio": Modality.Audio,
      "graph": Modality.Graph,
      "image": Modality.Image,
      "multimodal": Modality.Multimodal,
      "tabular": Modality.Tabular,
      "time series": Modality.TimeSeries,
      "video": Modality.Video,
      "three d": Modality.ThreeD,
    };

    const platformMap: Record<string, PlatformType> = {
      "api": PlatformType.Api,
      "desktop": PlatformType.Desktop,
      "extension": PlatformType.Extension,
      "mobile": PlatformType.Mobile,
      "other": PlatformType.Other,
      "plugin": PlatformType.Plugin,
      "sdk": PlatformType.Sdk,
      "web": PlatformType.Web,
      "webhook": PlatformType.Webhook,
    };

    const productTypeMap: Record<string, ProductType> = {
      "agent": ProductType.Agent,
      "application": ProductType.Application,
      "dataset": ProductType.Dataset,
      "framework": ProductType.Framework,
      "hardware": ProductType.Hardware,
      "model": ProductType.Model,
      "other": ProductType.Other,
      "service": ProductType.Service,
      "template": ProductType.Template,
      "toolkit": ProductType.Toolkit,
    };
  
    // --- Extract function ---
    const extract = <T>(map: Record<string, T>): T[] => {
      const results: T[] = [];
      for (const [key, value] of Object.entries(map)) {
        if (normalized.includes(key)) results.push(value);
      }
      return results;
    };
  
    const domain = extract(domainMap);
    const toolUserType = extract(userTypeMap);
    const aiType = extract(aiTypeMap);
    const aiCapability = extract(aiCapMap);
    const pricingType = extract(pricingTypeMap);
    const deliveryMethod = extract(deliveryMethodMap);
    const modality = extract(modalityMap);
    const platform = extract(platformMap); 
    const productType = extract(productTypeMap);
    
    return {
      domain: domain.length ? domain : [],
      toolUserType: toolUserType.length ? toolUserType : [],
      aiType: aiType.length ? aiType : [],
      aiCapability: aiCapability.length ? aiCapability : [],
      pricingType: pricingType.length ? pricingType : [],
      deliveryMethod: deliveryMethod.length ? deliveryMethod : [],
      modality: modality.length ? modality : [], 
      platform: platform.length ? platform : [],
      productType: productType.length ? productType : [],
      keywords: normalized.split(" ").filter(word => word.length > 0),
    };
  }
  

  // 👉 {
  //   domain: ['AGRICULTURE'],
  //   toolUserType: ['STUDENT'],
  //   aiType: ['GENETATIVE_AI'],
  //   aiCapability: ['GENETATIVE_IMAGE']
  // }
  // can be optimize to  also work on semantic enums like agriculture or farmer