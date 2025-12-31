import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";

const questionnaireData = {
  questions: [
    {
      section: 'About Your Business',
      questions: [
        {
          id: 0,
          propertyName: 'servicesOffered',
          text: 'What services do you offer?',
          options: [
            'Pet Grooming',
            'Pet Boarding',
            'Pet Daycare',
            'Dog Walking',
            'Pet Sitting',
            'Pet Training',
            'Veterinary Services',
            'Pet Transportation',
            'Pet Nutrition & Diet Consulting',
            'Pet Photography',
            'Pet Behavioral Counseling',
            'Pet Spa Services',
            'Pet Waste Management',
            'Pet Adoption Services',
            'Pet Health and Wellness Programs',
            'Exotic Pet Care',
            'Other',
          ],
          hint: 'Providing a list of services helps create a strong brand identity on your website.',
        },
        {
          id: 1,
          propertyName: 'businessName',
          text: 'What is the name of your pet care business?',
          options: null,
          hint: 'Providing a clear name and services helps create a strong brand identity on your website.',
        },
        {
          id: 2,
          propertyName: 'uniqueSellingPoints',
          text: 'What makes your pet care services unique compared to other local competitors?',
          options: null,
          hint: 'Highlighting your unique selling points ensures your website stands out from the competition.',
        },
      ],
    },
    {
      section: 'Target Audience',
      questions: [
        {
          id: 3,
          propertyName: 'idealClients',
          text: 'Who are your ideal clients?',
          options: ['Busy professionals', 'Families', 'Elderly pet owners', 'Vacationers', 'Other'],
          hint: 'Identifying your target clients will help tailor the website design and content to their needs.',
        },
        {
          id: 4,
          propertyName: 'primaryPetsServed',
          text: 'What kind of pets do you primarily serve?',
          options: ['Dogs', 'Cats', 'Exotic pets', 'Small animals', 'Other'],
          hint: 'Understanding the types of pets you serve will influence the visuals and services highlighted on your website.',
        },
        {
          id: 5,
          propertyName: 'targetAudienceDescription',
          text: 'Describe your target audience or typical client.',
          options: null,
          hint: 'Briefly describe the type of pet owners you serve.',
        },
      ],
    },
    {
      section: 'Website Goals',
      questions: [
        {
          id: 6,
          propertyName: 'primaryWebsiteGoal',
          text: 'What is the primary goal of your website?',
          options: [
            'Attract new clients',
            'Provide information',
            'Allow online booking',
            'Showcase testimonials',
            'Other',
          ],
          hint: 'Your primary goal should guide the overall design and structure of your website.',
        },
        {
          id: 7,
          propertyName: 'secondaryWebsiteGoal',
          text: 'What is the secondary goal of your website?',
          options: [
            'Build trust through educational content',
            'Create a community through a blog',
            'Offer pet care tips',
            'Other',
          ],
          hint: 'Secondary goals can enhance user engagement and build customer loyalty over time.',
        },
        {
          id: 8,
          propertyName: 'haveExistingWebsite',
          text: 'Do you currently have a website?',
          options: ['Yes', 'No'],
          hint: 'Indicate whether you have an existing website.',
        },
        {
          id: 9,
          propertyName: 'budgetRange',
          text: 'What is your budget range for this project?',
          options: ['<£1000', '£1000 - £2000', '£2000 - £5000', '>£5000'],
          hint: 'Choose a budget range that fits your needs.',
        },
      ],
    },
    {
      section: 'User Experience (UX)',
      questions: [
        {
          id: 10,
          propertyName: 'desiredCustomerFeelings',
          text: 'How do you want your customers to feel when they visit your website?',
          options: ['Playful and friendly', 'Professional and trustworthy', 'Cozy and welcoming', 'Other'],
          hint: 'The tone and feel of your website should resonate with your target audience and business goals.',
        },
        {
          id: 11,
          propertyName: 'importantUserInteractions',
          text: 'Which user interactions are most important for you?',
          options: ['Easy navigation', 'Clear call-to-actions', 'Contact form', 'Online booking system', 'Other'],
          hint: 'Focusing on user experience ensures visitors can easily find the information they need and take action.',
        },
      ],
    },
    {
      section: 'Website Tone and Style',
      questions: [
        {
          id: 12,
          propertyName: 'websiteStyle',
          text: 'What style do you envision for your website?',
          options: ['Modern', 'Minimalist', 'Colorful', 'Playful', 'Elegant', 'Other'],
          hint: 'Your website style should reflect your brand personality and appeal to your target audience.',
        },
        {
          id: 13,
          propertyName: 'preferredImagery',
          text: 'What type of imagery or themes would resonate best with your clients?',
          options: ['Cute pet images', 'Family photos with pets', 'Professional service pictures', 'Other'],
          hint: 'Using the right imagery can create an emotional connection with your audience, making your website more engaging.',
        },
      ],
    },
    {
      section: 'Website Features',
      questions: [
        {
          id: 14,
          propertyName: 'mustHaveFeatures',
          text: 'Which features are a must-have for your website?',
          options: [
            'Online booking',
            'Service gallery',
            'Client testimonials',
            'Pricing information',
            'Pet care tips blog',
            'Other',
          ],
          hint: 'Prioritizing essential features ensures your website serves both your business and your customers needs.',
        },
        {
          id: 15,
          propertyName: 'needEcommerce',
          text: 'Do you need an eCommerce feature for selling pet-related products?',
          options: ['Yes', 'No'],
          hint: 'If you plan to sell products, adding an eCommerce feature will be critical to your site functionality.',
        },
        {
          id: 16,
          propertyName: 'includeBlogOrNewsletter',
          text: 'Would you like to include a blog or newsletter to share pet care tips and advice?',
          options: ['Yes', 'No'],
          hint: 'A blog or newsletter can help build trust and engage your audience with valuable pet care information.',
        },
      ],
    },
    {
      section: 'Content and Updates',
      questions: [
        {
          id: 17,
          propertyName: 'websiteUpdateFrequency',
          text: 'How frequently do you plan to update your website?',
          options: ['Monthly blog posts', 'Seasonal promotions', 'Real-time availability updates', 'Other'],
          hint: 'Planning regular updates can keep your website fresh and engaging for returning visitors.',
        },
        {
          id: 18,
          propertyName: 'includePetResources',
          text: 'Would you like your clients to easily access pet-related resources or information on your site?',
          options: ['Yes', 'No'],
          hint: 'Providing accessible resources, like pet care guides, can enhance your site value to clients.',
        },
      ],
    },
    {
      section: 'Call to Action (CTA)',
      questions: [
        {
          id: 19,
          propertyName: 'desiredVisitorActions',
          text: 'What actions do you want visitors to take on your website?',
          options: ['Book a service', 'Contact you', 'Subscribe to a newsletter', 'Other'],
          hint: 'Clear calls-to-action guide visitors toward the key goals of your website, like booking or contacting you.',
        },
        {
          id: 20,
          propertyName: 'ctaPlacement',
          text: 'Where would you like the most important CTAs (call-to-action buttons) to be placed?',
          options: ['At the top of the homepage', 'After every service description', 'At the bottom of pages', 'Other'],
          hint: 'Strategically placed CTA buttons can significantly increase the chances of visitors taking desired actions.',
        },
      ],
    },
    {
      section: 'Competitor Insights',
      questions: [
        {
          id: 21,
          propertyName: 'admiredCompetitorWebsites',
          text: 'Are there any competitor websites that you admire?',
          options: null,
          hint: 'Understanding what you like about competitor websites can help shape the design and features of your own.',
        },
      ],
    },
    {
      section: 'Branding and Design Preferences',
      questions: [
        {
          id: 22,
          propertyName: 'haveLogoAndBranding',
          text: 'Do you already have a logo and branding in place?',
          options: ['Yes', 'No'],
          hint: 'Having consistent branding in place ensures a unified look and feel for your website.',
        },
        {
          id: 23,
          propertyName: 'preferredColorSchemes',
          text: 'What are your preferred color schemes?',
          options: ['Bright and playful', 'Neutral and calming', 'Earthy and natural', 'Other'],
          hint: 'The color scheme can influence how visitors perceive your brand. Choose colors that align with your vision.',
        },
      ],
    },
    {
      section: 'Mobile Experience',
      questions: [
        {
          id: 24,
          propertyName: 'mobileOptimizationImportance',
          text: 'How important is it for your website to work seamlessly on mobile devices?',
          options: ['Very important', 'Somewhat important', 'Not important'],
          hint: 'With more users accessing websites on mobile devices, optimizing for mobile is essential for user satisfaction.',
        },
      ],
    },
    {
      section: 'Future Growth',
      questions: [
        {
          id: 25,
          propertyName: 'anticipateServiceExpansion',
          text: 'Do you anticipate expanding your services in the future?',
          options: ['Yes', 'No'],
          hint: 'Planning for growth ensures your website can adapt and scale as your business expands.',
        },
        {
          id: 26,
          propertyName: 'needWebsiteFlexibility',
          text: 'Would you like your website to have the flexibility to grow with your business?',
          options: ['Yes', 'No'],
          hint: 'A flexible website design allows you to add new features and content as your business grows.',
        },
      ],
    },
    {
      section: 'SEO and Analytics',
      questions: [
        {
          id: 27,
          propertyName: 'interestedInSEO',
          text: 'Are you interested in optimizing your website for search engines (SEO) to reach more clients?',
          options: ['Yes', 'No'],
          hint: 'SEO helps your website rank higher in search results, driving more traffic and potential clients to your site.',
        },
        {
          id: 28,
          propertyName: 'interestedInAnalytics',
          text: 'Would you like to track visitor behavior and engagement using analytics?',
          options: ['Yes', 'No'],
          hint: 'Using analytics allows you to understand how visitors interact with your site and optimize accordingly.',
        },
      ],
    },
    {
      section: 'Business and Personal Contact Information',
      questions: [
        {
          id: 29,
          propertyName: 'email',
          text: 'Email Address',
          options: null,
          hint: 'Having your contact information readily available will help me reach out to you easily.',
        },
        {
          id: 30,
          propertyName: 'phone',
          text: 'Phone Number',
          options: null,
          hint: 'Having your contact information readily available will help me reach out to you easily.',
        },
        {
          id: 31,
          propertyName: 'agreeToCommunications',
          text: 'Do you agree to further communication?',
          options: ['Yes', 'No'],
          hint: 'Selecting Yes will allow me to contact you with a quote and more information.',
        },
      ],
    },
  ],
};

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (recommendationId: string, questionnaireData: Record<string, any>) => void;
}

const QuestionnaireModal = ({ isOpen, onClose, onComplete }: QuestionnaireModalProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const allQuestions = questionnaireData.questions.flatMap((section) => section.questions);
  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const currentQuestion = allQuestions[currentQuestionIndex];

  useEffect(() => {
    const currentAnswer = selectedAnswers[currentQuestion.propertyName];
    setIsAnswered(currentAnswer !== null && currentAnswer !== undefined && currentAnswer !== '');
  }, [currentQuestionIndex, selectedAnswers, currentQuestion.propertyName]);

  useEffect(() => {
    if (isOpen) {
      trackEvent('questionnaire_started', {
        total_questions: totalQuestions
      });
    }
  }, [isOpen, totalQuestions]);

  const handleAnswerChange = (propertyName: string, value: any) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [propertyName]: value,
    }));

    trackEvent('questionnaire_answer', {
      question_index: currentQuestionIndex,
      question_id: currentQuestion.id,
      property_name: propertyName
    });
  };

  const handleNext = () => {
    if (isAnswered) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        trackEvent('questionnaire_progress', {
          question_index: currentQuestionIndex + 1,
          progress_percent: Math.round(((currentQuestionIndex + 2) / totalQuestions) * 100)
        });
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://n8n.srv920835.hstgr.cloud/webhook/lovable-get-quote-questionnaire', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(selectedAnswers),
      });

      if (!response.ok) {
        throw new Error('Failed to submit questionnaire');
      }

      const responseData = await response.json();
      const recommendationId = responseData.id || Math.random().toString(36).substr(2, 9);
      
      trackEvent('questionnaire_completed', {
        recommendation_id: recommendationId,
        total_answers: Object.keys(selectedAnswers).length
      });
      
      toast({
        title: "Questionnaire Complete! 🎉",
        description: "Generating your personalized recommendations...",
      });
      
      onComplete(recommendationId, selectedAnswers);
      onClose();
      
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      trackEvent('questionnaire_error', {
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = () => {
    const currentAnswer = selectedAnswers[currentQuestion.propertyName] || '';

    if (currentQuestion.options) {
      if (currentQuestion.propertyName === 'mustHaveFeatures' || currentQuestion.propertyName === 'servicesOffered') {
        // Multi-select for features and services
        return (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <Checkbox
                  id={option}
                  checked={Array.isArray(currentAnswer) && currentAnswer.includes(option)}
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (checked) {
                      handleAnswerChange(currentQuestion.propertyName, [...currentValues, option]);
                    } else {
                      handleAnswerChange(currentQuestion.propertyName, currentValues.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={option} className="text-base cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      } else {
        // Single select dropdown
        return (
          <Select value={currentAnswer} onValueChange={(value) => handleAnswerChange(currentQuestion.propertyName, value)}>
            <SelectTrigger className="text-base py-3 h-auto">
              <SelectValue placeholder="Choose an option..." />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options.map((option) => (
                <SelectItem key={option} value={option} className="text-base py-2">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
    } else {
      // Text input or textarea
      const isLongText = currentQuestion.propertyName === 'uniqueSellingPoints' || 
                        currentQuestion.propertyName === 'targetAudienceDescription' ||
                        currentQuestion.propertyName === 'admiredCompetitorWebsites';
      
      if (isLongText) {
        return (
          <Textarea
            placeholder="Tell us more..."
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.propertyName, e.target.value)}
            className="text-base min-h-[100px] resize-none"
          />
        );
      } else {
        return (
          <Input
            type={currentQuestion.propertyName === 'email' ? 'email' : 'text'}
            placeholder={currentQuestion.propertyName === 'email' ? 'your@email.com' : 
                         currentQuestion.propertyName === 'phone' ? 'Your phone number' : 'Your answer...'}
            value={currentAnswer}
            onChange={(e) => handleAnswerChange(currentQuestion.propertyName, e.target.value)}
            className="text-base py-3 h-auto"
          />
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-card border-border">
        <div className="p-8">
          <DialogHeader className="text-center mb-8">
            <DialogTitle className="text-3xl font-bold text-foreground mb-4">
              Get Your Perfect Pet Care Website
            </DialogTitle>
            <p className="text-lg text-muted-foreground">
              Answer a few questions to receive personalized recommendations for your pet care business
            </p>
          </DialogHeader>

          {isSubmitting ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-foreground"></div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Analyzing Your Requirements...
              </h3>
              <p className="text-muted-foreground">
                We're creating your personalized recommendations for your pet care business.
              </p>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="space-y-6" key={currentQuestion.id}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Zap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {currentQuestion.text}
                  </h3>
                </div>

                {/* Input Field */}
                <div className="max-w-2xl mx-auto">
                  {renderInput()}
                </div>

                {/* Hint */}
                <div className="bg-muted/50 border border-border rounded-lg p-6 max-w-2xl mx-auto">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-foreground mb-2">Why we ask this</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {currentQuestion.hint}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="font-semibold disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`font-semibold transition-all duration-300 ${
                    isAnswered 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {currentQuestionIndex === totalQuestions - 1 ? (
                    <>
                      Get Recommendations
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                100% free • Personalized recommendations • No spam, ever
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionnaireModal;