import type { Metadata } from 'next';
import DischargePathways from '../components/DischargePathways';

export const metadata: Metadata = {
  title: 'Discharge Pathways — UK Mental Health System',
};

export default function DischargePage() {
  return <DischargePathways />;
}
