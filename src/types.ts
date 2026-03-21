export interface FunnelData {
  id: string;
  name: string;
  target: string;
  painPoint: string;
  existingSolution: string;
  solution: string;
  coreValue: string;
  offer: string;
  leadMagnet: string;
  ctaText: string;
  scarcity: string;
  resultImageUrl: string;
}

export interface LeadData {
  id: string;
  funnelId: string;
  productType: string;
  currentProblem: string;
  goal: string;
  experience: string;
  contact: string;
  consent?: boolean;
  createdAt: string;
}
