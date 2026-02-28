import type { Metadata } from 'next';
import RightsGuide from '../components/RightsGuide';

export const metadata: Metadata = {
  title: 'Patient Rights — UK Mental Health System',
};

export default function RightsPage() {
  return <RightsGuide />;
}
