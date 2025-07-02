import { Code } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
    return      (
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-400" />
                Technical Stack
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React 18 with Hooks</li>
                <li>• Modern JavaScript (ES6+)</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Lucide React icons</li>
                <li>• Responsive design principles</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Advanced filtering & search</li>
                <li>• Multiple view modes</li>
                <li>• Interactive status management</li>
                <li>• Smooth animations</li>
                <li>• Professional UI/UX</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Development Quality</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Clean, maintainable code</li>
                <li>• Component-based architecture</li>
                <li>• Performance optimized</li>
                <li>• Scalable structure</li>
                <li>• Production-ready</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              Professional React Development Showcase • 
              Built with modern best practices and enterprise-grade architecture
            </p>
          </div>
        </div>
      </div>);
};

export default Footer;