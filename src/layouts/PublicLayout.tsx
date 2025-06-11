import { FC, PropsWithChildren } from 'react';
// import { Navbar } from '@/components/common/Navbar';
// import { Footer } from '@/components/common/Footer';

export const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-1">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};
