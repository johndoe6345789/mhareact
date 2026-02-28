import type { Metadata } from 'next';
import DocumentBrowser from '../components/DocumentBrowser';

export const metadata: Metadata = {
  title: 'Document Library — UK Mental Health System',
};

export default function DocumentsPage() {
  return <DocumentBrowser />;
}
