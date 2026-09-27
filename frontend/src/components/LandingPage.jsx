import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import HowItWorksSection from './HowItWorksSection';
import FeaturesSection from './FeaturesSection';
import ProductShowcaseSection from './ProductShowcaseSection';
import TutorSection from './TutorSection';
import PrivacySection from './PrivacySection';
import WhoIsItForSection from './WhoIsItForSection';
import FinalCTASection from './FinalCTASection';
import Footer from './Footer';

export default function LandingPage({ onStartLearning }) {
  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh' }}>
      <Navbar onStartLearning={() => onStartLearning()} />
      <HeroSection onStartLearning={() => onStartLearning()} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ProductShowcaseSection onStartLearning={(tab) => onStartLearning(tab)} />
      <TutorSection onStartLearning={(tab) => onStartLearning(tab)} />
      <PrivacySection />
      <WhoIsItForSection />
      <FinalCTASection onStartLearning={() => onStartLearning()} />
      <Footer onStartLearning={() => onStartLearning()} />
    </div>
  );
}
