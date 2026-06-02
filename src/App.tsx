import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import IncludedSection from '@/sections/IncludedSection';
import ContactSection from '@/sections/ContactSection';

export default function App() {
  useLenis();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <IncludedSection />
        <ContactSection />
      </main>
    </>
  );
}
