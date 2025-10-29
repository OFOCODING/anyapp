import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Find Anything Nearby",
      subtitle: "Discover the best local services and products around you with just a few taps",
      emoji: "📍"
    },
    {
      title: "Find Anything Near You",
      subtitle: "Discover local businesses, services, and products in your area",
      emoji: "🗺️"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md pt-4">
        <div className="flex items-center gap-2 mb-8">
          <MapPin className="text-[#0EA5E9]" size={32} strokeWidth={2.5} />
          <span className="text-2xl font-bold text-gray-800">Anyapp</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="bg-[#FEF3C7] rounded-[32px] p-12 mb-8 w-72 h-72 flex items-center justify-center shadow-sm">
          <div className="text-[120px] leading-none">{slides[step].emoji}</div>
        </div>
        
        <h2 className="text-[28px] font-bold text-gray-900 mb-4 text-center leading-tight px-4">
          {slides[step].title}
        </h2>
        <p className="text-[16px] text-gray-600 text-center mb-10 px-8 leading-relaxed">
          {slides[step].subtitle}
        </p>
        
        <div className="flex gap-2 mb-12">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === step ? 'w-8 bg-[#0EA5E9]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-md space-y-4 pb-4">
        <button
          onClick={() => {
            if (step < slides.length - 1) {
              setStep(step + 1);
            } else {
              navigate('/auth');
            }
          }}
          className="w-full bg-[#0EA5E9] text-white py-4 rounded-full font-semibold text-[16px] hover:bg-[#0284C7] transition shadow-md"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/auth')}
          className="w-full text-gray-600 py-3 text-[15px]"
        >
          I already have an account
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
