import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Heart, Star } from 'lucide-react';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: 'Personalized Assessment',
      description: 'Complete a comprehensive stress assessment tailored to your unique situation.',
    },
    {
      icon: <Star className="h-8 w-8 text-primary-600" />,
      title: 'Expert Recommendations',
      description: 'Receive personalized support options based on your specific stress profile.',
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: 'Continuous Support',
      description: 'Connect with buddies, counsellors, and professionals who can help you manage stress.',
    },
  ];
  
  return (
    <Layout fullHeight>
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-100 to-accent-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
                  Your Path to Peace of Mind
                </h1>
                <p className="text-lg text-neutral-700 mb-8 max-w-lg">
                  CalmCue helps you understand and manage your stress with personalized
                  recommendations and connections to the right support.
                </p>
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  icon={<ArrowRight />}
                  iconPosition="right"
                >
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3768722/pexels-photo-3768722.jpeg" 
                  alt="Peaceful meditation scene" 
                  className="rounded-xl shadow-soft-lg max-w-full h-auto" 
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                How CalmCue Works
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Our platform provides a simple yet effective approach to managing stress
                and connecting you with the right resources.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="text-center p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
                Ready to Take Control of Your Stress?
              </h2>
              <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Join CalmCue today and discover personalized strategies to manage stress
                and improve your mental wellbeing.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
              >
                Start Your Assessment
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;