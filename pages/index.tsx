import Hero from '../components/Hero';
import AvailabilityForm from '../components/AvailabilityForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Hero />
      <AvailabilityForm />
    </main>
  );
} 