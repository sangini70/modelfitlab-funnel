import React from 'react';
import { LeadData } from '../types';
import { Users, Download, Search } from 'lucide-react';

interface DashboardProps {
  leads: LeadData[];
}

export default function Dashboard({ leads }: DashboardProps) {
  const downloadCSV = () => {
    const headers = ['ID', '상품 종류', '현재 문제', '목표', '경험 여부', '연락처', '개인정보동의', '신청일'];
    const csvContent = [
      headers.join(','),
      ...leads.map((lead) =>
        [
          lead.id,
          `"${lead.productType}"`,
          `"${lead.currentProblem}"`,
          `"${lead.goal}"`,
          `"${lead.experience}"`,
          `"${lead.contact}"`,
          lead.consent ? '"동의"' : '"미동의"',
          new Date(lead.createdAt).toLocaleString(),
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'leads.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">수집된 리드 목록</h2>
            <p className="text-sm text-gray-500 mt-1">총 {leads.length}명의 잠재 고객</p>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="연락처 검색..."
              className="pl-9 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={downloadCSV}
            disabled={leads.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            CSV 다운로드
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">연락처</th>
                <th className="px-6 py-4 font-semibold text-gray-900">상품 종류</th>
                <th className="px-6 py-4 font-semibold text-gray-900">현재 문제</th>
                <th className="px-6 py-4 font-semibold text-gray-900">목표</th>
                <th className="px-6 py-4 font-semibold text-gray-900">동의여부</th>
                <th className="px-6 py-4 font-semibold text-gray-900">신청일</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    아직 수집된 리드가 없습니다.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{lead.contact}</td>
                    <td className="px-6 py-4 text-gray-600">{lead.productType}</td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]" title={lead.currentProblem}>
                      {lead.currentProblem}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]" title={lead.goal}>
                      {lead.goal}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {lead.consent ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          동의
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          미동의
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
