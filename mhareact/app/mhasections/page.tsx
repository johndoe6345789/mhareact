import type { Metadata } from 'next';
import MHASections from '../components/MHASections';

export const metadata: Metadata = {
  title: 'MHA Sections — UK Mental Health System',
};

export default function MHASectionsPage() {
  return <MHASections />;
}
