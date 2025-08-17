import Seo from "@/components/Seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const categories = [
    "General Questions",
    "Services Offered",
    "Pricing and Payments",
    "Policies and Procedures",
    "General Website & Design",
    "Marketing & Online Presence",
    "Niche-Specific Questions",
  ];

  const faqData = {
    "General Questions": [
      { 
        "question": "What areas do you serve?", 
        "answer": "I am a Northampton-based web designer, but I can work with pet care professionals throughout the UK." 
      },
      { 
        "question": "What types of pet care businesses do you create websites for?", 
        "answer": "I specialise in creating websites for a wide range of pet care businesses in Northampton, including dog walkers, pet sitters, dog groomers, pet boarding facilities, and more. If you have a unique pet care business, please contact me to discuss your specific needs." 
      },
      { 
        "question": "Do you have experience working with Wix?", 
        "answer": "Yes, I am a Wix expert and specialise in creating beautiful, functional, and affordable Wix websites for pet care professionals in Northampton." 
      },
      { 
        "question": "How do I contact you?", 
        "answer": "You can contact me through the contact form on my website, by email at heryourbarme@live.com, or by phone at 07402342694. I'm always happy to answer any questions you may have." 
      }
    ],

    "Services Offered": [
      { 
        "question": "What services do you offer?", 
        "answer": "I offer a variety of website design and development services tailored for pet care businesses in Northampton, including Wix website design, website maintenance, SEO optimization, and content creation. Please visit my services page for a complete list and detailed descriptions." 
      },
      { 
        "question": "Can you create an online booking system for my pet care website?", 
        "answer": "Yes, I can integrate online booking systems into your Wix website, making it easy for clients in Northampton to schedule appointments or book your services online." 
      },
      { 
        "question": "Can you help me with my website's SEO?", 
        "answer": "Absolutely! I can help you optimise your website for search engines, ensuring that your pet care business appears at the top of Google when people search for relevant keywords in Northampton." 
      },
      { 
        "question": "Do you offer website maintenance services?", 
        "answer": "Yes, I offer ongoing website maintenance packages to ensure your website stays up-to-date, secure, and running smoothly. This includes regular backups, security updates, and content updates." 
      }
    ],
    "Pricing and Payments": [
      { 
        "question": "What are your rates?", 
        "answer": "My rates vary depending on the complexity of the project and the specific services you require. I offer competitive pricing and transparent quotes for all my web design services. Contact me for a personalised quote for your pet care website." 
      },
      { 
        "question": "How do I make a payment?", 
        "answer": "I accept various payment methods, including bank transfers, credit cards, and PayPal. We can discuss the best payment option for you during our initial consultation." 
      },
      { 
        "question": "Do you offer discounts?", 
        "answer": "Yes, I occasionally offer discounts for new clients or for specific services. Contact me to inquire about any current discounts or special offers." 
      }
    ],
    "Policies and Procedures": [
      { 
        "question": "What is your cancellation policy?", 
        "answer": "I have a clear and fair cancellation policy. Please contact me to discuss the details." 
      },
      { 
        "question": "Do you offer refunds?", 
        "answer": "I strive to provide the highest quality service to all my clients. Please contact me to discuss my refund policy in detail." 
      },
      { 
        "question": "How do you handle project revisions?", 
        "answer": "I offer a specific number of revisions within each project to ensure your satisfaction. We can discuss the revision process in more detail during our initial consultation." 
      }
    ],
    "General Website & Design": [ 
      { 
        "question": "I'm worried about my website looking like everyone else's. Can you make mine unique?", 
        "answer": "Absolutely! We understand the importance of standing out. We'll work closely with you to create a custom Wix website that reflects your brand, showcases your unique selling points, and appeals to pet owners in Northampton." 
      },
      {
        "question": "What if I already have a website, but it's outdated?",
        "answer": "No problem! We offer website revamp services to breathe new life into your existing site. We can update your design, improve functionality, and optimise it for search engines to attract more clients in Northampton."
      }
    ],

    "Marketing & Online Presence": [
      { 
        "question": "How quickly can I expect to see results from my new website?", 
        "answer": "While results vary, a well-designed and optimised website can start attracting new clients within a few weeks. Factors like your niche, competition, and marketing efforts also play a role. Let's discuss your goals and create a strategy for online success!" 
      }
    ],
    "Niche-Specific Questions": [
      { 
        "question": "I offer pet boarding in Northampton. How can a website help me attract more clients during peak seasons?", 
        "answer": "A website can be a powerful tool for attracting pet boarding clients, especially during peak seasons. We can optimise your website for relevant keywords like 'pet boarding Northampton' and create targeted content about holiday pet care. A blog with tips for pet owners preparing for boarding can also attract more visitors to your site." 
      }
    ]
  };

  // Generate JSON-LD structured data from all FAQ items
  const allFaqItems = categories.flatMap(category => 
    faqData[category].map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  );

  const faqJsonLd = [{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems
  }];

  return (
    <>
      <Seo
        title="FAQ - Pet Care Website Design & Marketing | Tail Wagging Websites Northampton"
        description="Get answers to common questions about pet care website design, SEO, pricing, and services for dog walkers, groomers, and pet businesses in Northampton."
        path="/faq"
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "FAQ", item: "/faq" }]}
        jsonLd={faqJsonLd}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Everything you need to know about our pet care website design and marketing services in Northampton.
        </p>
        
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">{category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqData[category].map((item, index) => (
                  <AccordionItem key={index} value={`${category}-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
