import React from 'react';
import { motion } from 'framer-motion';
import { SupportOption } from '../../types';
import Card from '../ui/Card';
import { getSupportIcon } from '../../data/supportOptions';

interface SupportCardProps {
  supportOption: SupportOption;
  priority: number;
}

const SupportCard: React.FC<SupportCardProps> = ({ supportOption, priority }) => {
  const Icon = getSupportIcon(supportOption.icon);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={priority}
    >
      <Card className="h-full">
        <div className="flex items-start">
          <div className={`
            p-3 rounded-full mr-4 
            ${priority === 0 ? 'bg-primary-100 text-primary-600' :
              priority === 1 ? 'bg-secondary-100 text-secondary-600' :
              priority === 2 ? 'bg-accent-100 text-accent-600' :
              'bg-neutral-100 text-neutral-600'}
          `}>
            <Icon size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              {supportOption.title}
            </h3>
            
            <p className="text-neutral-600 mb-4">
              {supportOption.description}
            </p>
            
            {supportOption.contactName && (
              <div className="border-t border-neutral-200 pt-3 mt-2">
                <p className="text-sm font-medium text-neutral-700">
                  {supportOption.contactName}
                </p>
                {supportOption.contactInfo && (
                  <p className="text-sm text-primary-600">
                    {supportOption.contactInfo}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SupportCard;