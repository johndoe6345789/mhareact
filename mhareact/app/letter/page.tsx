import type { Metadata } from 'next';
import LetterGenerator from '../components/LetterGenerator';

export const metadata: Metadata = {
  title: 'Discharge Letter — UK Mental Health System',
};

export default function LetterPage() {
  return <LetterGenerator />;
}
