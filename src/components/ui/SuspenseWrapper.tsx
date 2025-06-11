import React from 'react';
import { LazyLoadingSpinner } from './LazyLoadingSpinner';

interface SuspenseWrapperProps {
  children: React.ReactNode;
}

export const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => (
  <React.Suspense fallback={<LazyLoadingSpinner />}>
    {children}
  </React.Suspense>
);
