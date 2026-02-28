import type { Metadata } from 'next';
import RootProviders from './components/RootProviders';

export const metadata: Metadata = {
  title: 'UK Mental Health System — Reference Guide',
  description:
    'Comprehensive reference for the UK mental health inpatient system — MHA 1983 sections, hospital org chart, patient rights, document library, and section 23 discharge letter generator.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
