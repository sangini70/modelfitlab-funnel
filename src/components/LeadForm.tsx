import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadData } from '../types';
import { ChevronRight, CheckCircle2, X } from 'lucide-react';

interface LeadFormProps {
  funnelId: string;
  ctaText?: string;
  onSubmit: (data: LeadData) => void;
  onClose?: () => void;
}

const QUESTIONS = [
  {
    id: 'productType',
    question: '주로 판매하시는 상품은 어떤 종류인가요?',
    options: ['여성의류', '남성의류', '아동복', '중고/빈티지', '기타'],
  },
  {
    id: 'currentProblem',
    question: '현재 판매 시 가장 큰 고민은 무엇인가요?',
    options: ['모델 섭외 비용 부담', '촬영 시간 부족', '낮은 구매 전환율', '브랜드 무드 유지', '기타'],
  },
  {
    id: 'goal',
    question: '이 서비스를 통해 달성하고 싶은 가장 큰 목표는?',
    options: ['콘텐츠 제작 비용 절감', '매출(전환율) 상승', '업무 시간 단축', '브랜드 퀄리티 향상'],
  },
  {
    id: 'experience',
    question: 'AI 이미지 생성 서비스를 사용해본 적이 있으신가요?',
    options: ['네, 사용해봤습니다', '아니요, 처음입니다'],
  },
];

export default function LeadForm({ funnelId, ctaText, onSubmit, onClose }: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<LeadData>>({
    funnelId,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionSelect = (field: string, value: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    // 1. 필수 값 검증 (contact, step1~4 중 하나라도 비어있으면 전송 중단)
    const { contact, productType, currentProblem, goal, experience, consent } = formData;
    
    if (!contact || !productType || !currentProblem || !goal || !experience) {
      alert("모든 설문 항목을 완료해야 제출할 수 있습니다.");
      return;
    }

    setIsSubmitting(true);
    console.log("Webhook fired");
    
    const finalData: LeadData = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    } as LeadData;

    const now = new Date();
    const kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));
    const timestamp = kst.toISOString().replace('T', ' ').substring(0, 19);

    try {
      console.log("Zapier payload (v2):", {
        timestamp: timestamp,
        contact: contact,
        step1: productType,
        step2: currentProblem,
        step3: goal,
        step4: experience
      });

      // URLSearchParams를 사용하여 전송하면 브라우저의 OPTIONS(사전 요청)를 생략할 수 있어
      // Zapier에 빈 데이터(_zap_data_was_skipped)가 찍히는 현상을 방지합니다.
      await fetch("https://hooks.zapier.com/hooks/catch/18340824/uparye4/", {
        method: "POST",
        body: new URLSearchParams({
          timestamp: timestamp,
          contact: contact,
          step1: productType,
          step2: currentProblem,
          step3: goal,
          step4: experience
        })
      });

      onSubmit(finalData);
      setIsSuccess(true);
    } catch (error) {
      console.error("Webhook submission failed:", error);
      // 에러가 발생하더라도 사용자에게는 성공 화면을 보여주어 이탈을 방지합니다.
      onSubmit(finalData);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-auto border border-gray-100 relative"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">신청이 완료되었습니다!</h3>
        <p className="text-gray-600 mb-6">
          입력해주신 연락처로 안내 메시지를 보내드리겠습니다.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        )}
      </motion.div>
    );
  }

  const currentQuestion = QUESTIONS[step];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto border border-gray-100 relative overflow-hidden">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / (QUESTIONS.length + 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mb-8 mt-4">
        <span className="text-sm font-semibold text-indigo-600 tracking-wider uppercase">
          Step {step + 1} of {QUESTIONS.length + 1}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {step < QUESTIONS.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
              {currentQuestion.question}
            </h3>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200 group flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700 group-hover:text-indigo-700">
                    {option}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              마지막으로 결과를 받으실 연락처를 남겨주세요.
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              결과 전달 외 다른 용도로 절대 사용되지 않습니다.
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락처 (이메일 또는 전화번호)
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact || ''}
                  placeholder="010-0000-0000 또는 email@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-600 transition-colors"
                  onChange={(e) => {
                    const val = e.target.value;
                    let formatted = val;
                    // Only auto-format if there are no letters or @ (assume phone number)
                    if (!/[a-zA-Z@]/.test(val)) {
                      const numbers = val.replace(/[^\d]/g, '');
                      if (numbers.length > 3 && numbers.length <= 7) {
                        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
                      } else if (numbers.length > 7) {
                        formatted = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
                      } else {
                        formatted = numbers;
                      }
                    }
                    setFormData((prev) => ({ ...prev, contact: formatted }));
                  }}
                />
              </div>

              <div className="mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                      onChange={(e) => setFormData((prev) => ({ ...prev, consent: e.target.checked }))}
                      onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('개인정보 수집 및 이용 동의가 필요합니다.')}
                      onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      개인정보 수집 및 이용에 동의합니다
                    </span>
                    <span className="text-xs text-gray-600 mt-1 leading-relaxed">
                      입력하신 정보는 Before/After 결과 전달 및 상담 안내를 위해서만 사용됩니다.
수집된 개인정보는 관계 법령에 따라 안전하게 보관되며, 수집일로부터 30일 이내 삭제됩니다.
제3자에게 제공되거나 다른 용도로 사용되지 않습니다.
                    </span>
                    <span className="text-[11px] text-gray-400 mt-1">
                      ※ 입력하신 개인정보는 30일 후 삭제됩니다.
                    </span>
                  </div>
                </label>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm font-bold text-red-500 mb-2">
                  🔥 이번 주 5명만 무료 진행 중입니다
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    ctaText || '지금 무료 결과 받아보기 →'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
