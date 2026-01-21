
import React from 'react';
import { TESTIMONIALS } from '../constants';

interface TestimonialsProps {
  isDarkMode: boolean;
}

const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`w-4 h-4 transition-colors ${filled ? 'text-yellow-400' : 'text-slate-700'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Rating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} filled={i < rating} />
    ))}
  </div>
);

export const Testimonials: React.FC<TestimonialsProps> = ({ isDarkMode }) => {
  return (
    <section className={`backdrop-blur-lg border rounded-xl shadow-lg p-6 transition-all duration-300 ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white/40 border-white/30'}`}>
      <h2 className={`text-xl font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Мнения жителей</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={index} className={`rounded-xl p-5 border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/60' : 'bg-white/30 border-white/20 shadow-sm'}`}>
            <div className="flex items-center mb-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 border-2 border-green-500/30" />
              <div>
                <p className={`font-black uppercase tracking-tighter text-sm ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{testimonial.name}</p>
                <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>{testimonial.date}</p>
              </div>
            </div>
            <Rating rating={testimonial.rating} />
            <p className={`text-sm mt-3 leading-relaxed font-medium italic ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};
