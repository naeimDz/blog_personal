import { Code } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Section
            title="Tech Stack"
            icon={<Code className="w-5 h-5 text-blue-500" />}
            items={[
              'React 18 + Hooks',
              'Modern JavaScript (ES2022)',
              'TailwindCSS utility-first',
              'Lucide Icons (tree-shakable)',
              'Fully responsive layout',
            ]}
          />
          <Section
            title="Core Features"
            items={[
              'Dynamic filtering & smart search',
              'List/Grid view switching',
              'Real-time status interactions',
              'Micro-animations (UX-enhancing)',
              'Minimalist & consistent UI',
            ]}
          />
          <Section
            title="Code Quality"
            items={[
              'Readable & modular components',
              'Scalable folder structure',
              'Reusable logic patterns',
              'Performance-minded rendering',
              'Ready for deployment',
            ]}
          />
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-sm text-gray-500 text-center">
          <p>
            Built by a solo developer with ❤️ for clean code & meaningful design.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} React Frontend Showcase
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SectionProps {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, items, icon }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <ul className="space-y-2 text-gray-400 text-sm leading-relaxed">
      {items.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
    
  </div>
);

export default Footer;
