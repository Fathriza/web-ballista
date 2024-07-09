import React from 'react';
import PerformanceLineChart from '../../../../components/backoffice/PerformanceLineChart';
import PredictedSales from '../../../../components/backoffice/PredictedSales';
import CitySales from "../../../../components/backoffice/CitySales";
import GenderSales from "../../../../components/backoffice/GenderSales";

export default function MarketingPerformance() {
  return (
    <div className="mt-5 px-4">
      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-slate-50">MARKETING PERFORMANCE</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <PredictedSales />
        </div>
        <div>
          <PerformanceLineChart />
        </div>
        <div>
          <CitySales />
        </div>
        <div>
          <GenderSales/>
        </div>

      </div>
    </div>
  );
}

