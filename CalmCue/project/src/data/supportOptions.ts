import { SupportOption } from '../types';
import { MessageCircle, Phone, Brain, Sparkles } from 'lucide-react';

export const supportOptions: SupportOption[] = [
  {
    id: 'buddy',
    type: 'buddy',
    title: 'Speak to a Buddy',
    description: 'Connect with a trained peer who can listen and provide support in a friendly, non-clinical environment.',
    icon: 'MessageCircle',
  },
  {
    id: 'counsellor',
    type: 'counsellor',
    title: 'Need a Counsellor',
    description: 'Schedule a call or appointment with a professional counsellor who can help you develop coping strategies.',
    contactName: 'Soumya Mohanty',
    contactInfo: '9438000003',
    icon: 'Phone',
  },
  {
    id: 'psychologist',
    type: 'psychologist',
    title: 'Need a Clinical Psychologist',
    description: 'Get professional psychological support for more complex or severe stress and mental health concerns.',
    contactName: 'Snigdha',
    contactInfo: '7008686113',
    icon: 'Brain',
  },
  {
    id: 'meditation',
    type: 'meditation',
    title: 'Meditation & Medication',
    description: 'Learn meditation techniques and explore whether medication might be helpful for your situation.',
    contactName: 'Debashish Sahoo',
    contactInfo: '8249540364',
    icon: 'Sparkles',
  }
];

export const getSupportIcon = (iconName: string) => {
  switch (iconName) {
    case 'MessageCircle':
      return MessageCircle;
    case 'Phone':
      return Phone;
    case 'Brain':
      return Brain;
    case 'Sparkles':
      return Sparkles;
    default:
      return MessageCircle;
  }
};