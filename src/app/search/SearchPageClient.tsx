'use client';

import { useState } from 'react';
import MainContent from '../MainContent';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import FilterOptions from './FilterOptions';

export default function SearchPageClient() {
  const [dateFilters, setDateFilters] = useState({
    startDate: '',
    endDate: ''
  });

  const handleDateFilterChange = (filters: { startDate: string; endDate: string }) => {
    setDateFilters(filters);
  };

  return (
    <div className="  relative  mx-auto h-auto w-full max-w-[2100px] bg-base-100 ">
      <main className="relative ">
        <CommonNav />
        <FilterOptions onDateFilterChange={handleDateFilterChange} />
        <MainContent dateFilters={dateFilters}>
          <div/>
        </MainContent>
      </main>
    </div>
  );
}
