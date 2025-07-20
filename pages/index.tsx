import Hero from '../components/Hero';
import AvailabilityForm from '../components/AvailabilityForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      <AvailabilityForm />
    </main>
  );
} 