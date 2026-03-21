import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FunnelData, LeadData } from '../types';
import LeadForm from './LeadForm';
import { ArrowRight, CheckCircle2, AlertCircle, Camera, Upload, Sparkles, ArrowDown } from 'lucide-react';

interface LandingPageProps {
  data: FunnelData;
  onLeadSubmit: (lead: LeadData) => void;
}

export default function LandingPage({ data, onLeadSubmit }: LandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header with Logo */}
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              ModelFitLab
            </span>
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-8 border border-indigo-100">
              스마트스토어/인스타 셀러를 위한 AI 모델 이미지 솔루션
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] mb-6 text-gray-900">
              모델 섭외 없이<br />
              고정비 70~100만원 없이<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                이제 끝내세요
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed font-medium">
              사람 또는 마네킹에 착용한 사진 1장으로<br className="hidden sm:block" />
              자연스러운 모델 착용 이미지를 제작합니다
            </p>

            {/* 가격 강조 박스 */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-6 mb-8">
              <div className="text-sm font-bold text-gray-500 mb-3">
                촬영 비용 70~100만원 → 79,000원으로 대체
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-gray-600">
                  <span className="font-medium">🔥 모델 촬영 없이 5컷 제작</span>
                  <span className="font-bold line-through decoration-gray-400">79,000원</span>
                </div>
                <div className="flex items-center justify-between text-gray-900 mt-1">
                  <span className="font-bold text-lg text-indigo-600">👉 첫 샘플 50% 할인</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">39,500원</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-center sm:text-left text-sm font-bold text-indigo-600 mb-1">
                샘플 테스트 (5컷) 39,500원 (50% 할인)
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex justify-center items-center gap-2 px-8 py-5 text-xl font-bold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 w-full sm:w-auto"
              >
                지금 무료 결과 받아보기 (v2)
                <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-sm text-gray-500 font-medium text-center sm:text-left ml-2">
                🔥 현재 베타 5곳 한정 모집
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-50 rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg z-10 whitespace-nowrap">
                Before / After
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-2/5 relative group cursor-pointer">
                  <span className="absolute top-3 left-3 bg-black/50 text-white px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm z-10">Before</span>
                  <div className="rounded-2xl w-full aspect-[3/4] bg-gray-100 p-4 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/01_product.webp"
                      alt="Original Product"
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 -mx-5">
                    <ArrowRight className="w-5 h-5 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <div className="sm:hidden flex items-center justify-center -my-2 z-10">
                  <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                    <ArrowDown className="w-5 h-5 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <div className="w-full sm:w-3/5 relative group cursor-pointer">
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md z-10">After</span>
                  <img
                    src="/images/02_front.jpg"
                    alt="AI Model Result"
                    loading="lazy"
                    className="rounded-2xl w-full object-cover aspect-[3/4] shadow-lg border-2 border-indigo-100 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Problem Empathy Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              아직도 이런 고민을 하고 계신가요?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              '모델 섭외 비용 부담 (70~100만원)',
              '촬영 준비 및 시간 소요',
              '상품 등록 리드타임 증가',
              '직접 촬영 시 퀄리티 한계'
            ].map((problem, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-lg font-semibold text-gray-800 pt-1">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Solution Explanation */}
      <section className="py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            단 1장의 착용 사진으로<br />
            <span className="text-indigo-600">AI가 모델 착용 이미지를 생성합니다</span>
          </h2>
        </div>
      </section>

      {/* 4. Result Trust Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              실제 착용 기반이라<br className="sm:hidden" /> 각도별 결과가 자연스럽습니다
            </h2>
            <p className="text-lg text-gray-400 font-medium">
              모든 이미지는 1장 입력으로 생성됩니다
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { src: '/images/02_front.jpg', label: '정면' },
              { src: '/images/03_pose.jpg', label: '포즈' },
              { src: '/images/04_side.jpg', label: '측면' },
              { src: '/images/05_back.jpg', label: '후면' }
            ].map((img, idx) => (
              <div key={idx} className="relative group overflow-hidden rounded-2xl cursor-pointer">
                <img
                  src={img.src}
                  alt={`Model ${img.label}`}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover bg-gray-800 group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {img.label}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center flex flex-col items-center gap-3">
            <div className="text-sm font-bold text-indigo-400 mb-1">
              샘플 테스트 (5컷) 39,500원 (50% 할인)
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex justify-center items-center gap-2 px-8 py-4 text-lg font-bold text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5"
            >
              지금 무료 결과 받아보기
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. How to Use (3 STEP) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">이용 방법은 아주 간단합니다</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            {[
              { icon: Camera, step: 'STEP 1', title: '사람 또는 마네킹에\n옷을 입혀 촬영' },
              { icon: Upload, step: 'STEP 2', title: '정면 전신 사진\n업로드' },
              { icon: Sparkles, step: 'STEP 3', title: 'AI 모델 이미지\n생성 완료' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-sm">
                  <item.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-indigo-600 mb-2">{item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 whitespace-pre-line leading-snug">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ModelFitLab. All rights reserved.</p>
      </footer>

      {/* Lead Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <LeadForm 
                funnelId={data.id} 
                ctaText="지금 무료 결과 받아보기 →" 
                onSubmit={(lead) => {
                  onLeadSubmit(lead);
                }} 
                onClose={() => setIsModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
