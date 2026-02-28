import type { Metadata } from 'next';
import OrgChart from '../components/OrgChart';

export const metadata: Metadata = {
  title: 'Org Chart — UK Mental Health System',
};

export default function OrgChartPage() {
  return <OrgChart />;
}
