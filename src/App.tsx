import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { FunnelData, LeadData } from './types';
import Builder from './components/Builder';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { LayoutDashboard, Settings, ExternalLink } from 'lucide-react';

const DEFAULT_FUNNEL: FunnelData = {
  id: 'modelfitlab-v1',
  name: 'ModelFitLab v1',
  target: '스마트스토어 소형/초기 셀러, 인스타그램 기반 감성 셀러, 중고/빈티지 의류 리셀러',
  painPoint: '모델 섭외 및 스튜디오 대여로 인한 높은 고정비(최소 70~100만 원), 신상품 업로드 리드타임(평균 3주), 운영 스트레스',
  existingSolution: '바닥컷/옷걸이컷(구매 전환율 하락), 셀러 직접 피팅(퀄리티 하락 및 과부하), 대행사(고비용 마진 잠식)',
  solution: '기존 의류 사진 1장으로 고정된 모델 이미지에 정면 전신 1컷 AI 합성',
  coreValue: '콘텐츠 제작 고정비 90% 절감, 구매 전환율 60% 상승, 리드타임 2~3일로 압축, 전용 AI 모델 평생 활용',
  offer: '건별 12,000원, 베이직 구독 월 89,000원(10상품)',
  leadMagnet: '1:1 맞춤형 Before/After 비교 이미지 무료 발송',
  ctaText: '무료 Before/After 체험하기',
  scarcity: '현재 베타 5곳 한정 모집 중 (3곳 남음)',
  resultImageUrl: '/images/02_front.jpg',
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Admin Console
            </span>
          </div>
          <nav className="flex gap-1">
            <Link
              to="/admin/builder"
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                location.pathname === '/admin/builder'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              빌더
            </Link>
            <Link
              to="/admin/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                location.pathname === '/admin/dashboard'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              대시보드
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 text-gray-600 hover:bg-gray-100 transition-colors ml-4 border border-gray-200"
            >
              <ExternalLink className="w-4 h-4" />
              공개 페이지 보기
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-8">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [funnelData, setFunnelData] = useState<FunnelData>(() => {
    const saved = localStorage.getItem('funnelData');
    return saved ? JSON.parse(saved) : DEFAULT_FUNNEL;
  });

  const [leads, setLeads] = useState<LeadData[]>(() => {
    const saved = localStorage.getItem('leads');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('funnelData', JSON.stringify(funnelData));
  }, [funnelData]);

  useEffect(() => {
    localStorage.setItem('leads', JSON.stringify(leads));
  }, [leads]);

  const handleSaveFunnel = (data: FunnelData) => {
    setFunnelData(data);
    alert('퍼널이 저장되었습니다. 공개 페이지에서 확인하세요.');
  };

  const handleLeadSubmit = (lead: LeadData) => {
    setLeads((prev) => [...prev, lead]);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LandingPage data={funnelData} onLeadSubmit={handleLeadSubmit} />} />      
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/builder" replace />} />
        <Route 
          path="/admin/builder" 
          element={
            <AdminLayout>
              <Builder initialData={funnelData} onSave={handleSaveFunnel} />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminLayout>
              <Dashboard leads={leads} />
            </AdminLayout>
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
