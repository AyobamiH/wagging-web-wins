// import { useState, useMemo } from "react";
// import Seo from "@/components/Seo";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Search, MessageCircle, CreditCard, Shield, Palette, TrendingUp, Target } from "lucide-react";
// import { trackFAQToggle, trackSearch } from "@/lib/analytics";

// export default function FAQ() {
//   const categories = [
//     "General Questions",
//     "Services Offered",
//     "Pricing and Payments",
//     "Policies and Procedures",
//     "General Website & Design",
//     "Marketing & Online Presence",
//     "Niche-Specific Questions",
//   ];

//   const faqData = {
//     "General Questions": [
//       { 
//         "question": "What areas do you serve?", 
//         "answer": "I am a Northampton-based web designer, but I can work with pet care professionals throughout the UK." 
//       },
//       { 
//         "question": "What types of pet care businesses do you create websites for?", 
//         "answer": "I specialise in creating websites for a wide range of pet care businesses in Northampton, including dog walkers, pet sitters, dog groomers, pet boarding facilities, and more. If you have a unique pet care business, please contact me to discuss your specific needs." 
//       },
//       { 
//         "question": "Do you have experience working with Wix?", 
//         "answer": "Yes, I am a Wix expert and specialise in creating beautiful, functional, and affordable Wix websites for pet care professionals in Northampton." 
//       },
//       { 
//         "question": "How do I contact you?", 
//         "answer": "You can contact me through the contact form on my website, by email at heryourbarme@live.com, or by phone at 07402342694. I'm always happy to answer any questions you may have." 
//       }
//     ],

//     "Services Offered": [
//       { 
//         "question": "What services do you offer?", 
//         "answer": "I offer a variety of website design and development services tailored for pet care businesses in Northampton, including Wix website design, website maintenance, SEO optimization, and content creation. Please visit my services page for a complete list and detailed descriptions." 
//       },
//       { 
//         "question": "Can you create an online booking system for my pet care website?", 
//         "answer": "Yes, I can integrate online booking systems into your Wix website, making it easy for clients in Northampton to schedule appointments or book your services online." 
//       },
//       { 
//         "question": "Can you help me with my website's SEO?", 
//         "answer": "Absolutely! I can help you optimise your website for search engines, ensuring that your pet care business appears at the top of Google when people search for relevant keywords in Northampton." 
//       },
//       { 
//         "question": "Do you offer website maintenance services?", 
//         "answer": "Yes, I offer ongoing website maintenance packages to ensure your website stays up-to-date, secure, and running smoothly. This includes regular backups, security updates, and content updates." 
//       }
//     ],
//     "Pricing and Payments": [
//       { 
//         "question": "What are your rates?", 
//         "answer": "My rates vary depending on the complexity of the project and the specific services you require. I offer competitive pricing and transparent quotes for all my web design services. Contact me for a personalised quote for your pet care website." 
//       },
//       { 
//         "question": "How do I make a payment?", 
//         "answer": "I accept various payment methods, including bank transfers, credit cards, and PayPal. We can discuss the best payment option for you during our initial consultation." 
//       },
//       { 
//         "question": "Do you offer discounts?", 
//         "answer": "Yes, I occasionally offer discounts for new clients or for specific services. Contact me to inquire about any current discounts or special offers." 
//       }
//     ],
//     "Policies and Procedures": [
//       { 
//         "question": "What is your cancellation policy?", 
//         "answer": "I have a clear and fair cancellation policy. Please contact me to discuss the details." 
//       },
//       { 
//         "question": "Do you offer refunds?", 
//         "answer": "I strive to provide the highest quality service to all my clients. Please contact me to discuss my refund policy in detail." 
//       },
//       { 
//         "question": "How do you handle project revisions?", 
//         "answer": "I offer a specific number of revisions within each project to ensure your satisfaction. We can discuss the revision process in more detail during our initial consultation." 
//       }
//     ],
//     "General Website & Design": [ 
//       { 
//         "question": "I'm worried about my website looking like everyone else's. Can you make mine unique?", 
//         "answer": "Absolutely! We understand the importance of standing out. We'll work closely with you to create a custom Wix website that reflects your brand, showcases your unique selling points, and appeals to pet owners in Northampton." 
//       },
//       {
//         "question": "What if I already have a website, but it's outdated?",
//         "answer": "No problem! We offer website revamp services to breathe new life into your existing site. We can update your design, improve functionality, and optimise it for search engines to attract more clients in Northampton."
//       }
//     ],

//     "Marketing & Online Presence": [
//       { 
//         "question": "How quickly can I expect to see results from my new website?", 
//         "answer": "While results vary, a well-designed and optimised website can start attracting new clients within a few weeks. Factors like your niche, competition, and marketing efforts also play a role. Let's discuss your goals and create a strategy for online success!" 
//       }
//     ],
//     "Niche-Specific Questions": [
//       { 
//         "question": "I offer pet boarding in Northampton. How can a website help me attract more clients during peak seasons?", 
//         "answer": "A website can be a powerful tool for attracting pet boarding clients, especially during peak seasons. We can optimise your website for relevant keywords like 'pet boarding Northampton' and create targeted content about holiday pet care. A blog with tips for pet owners preparing for boarding can also attract more visitors to your site." 
//       }
//     ]
//   };

//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState("all");

//   const handleSearchChange = (value: string) => {
//     setSearchQuery(value);
//     // Track search after the query is set (filteredItems will update on next render)
//     if (value.trim()) {
//       setTimeout(() => trackSearch(value, 'faq_page'), 0);
//     }
//   };

//   const handleCategoryChange = (category: string) => {
//     setActiveCategory(category);
//     trackFAQToggle(`Category: ${category}`, 'navigation', 'open');
//   };

//   const categoryIcons = {
//     "General Questions": MessageCircle,
//     "Services Offered": Target,
//     "Pricing and Payments": CreditCard,
//     "Policies and Procedures": Shield,
//     "General Website & Design": Palette,
//     "Marketing & Online Presence": TrendingUp,
//     "Niche-Specific Questions": Target
//   };

//   const categoryColors = {
//     "General Questions": "bg-blue-500/10 text-blue-700 border-blue-200",
//     "Services Offered": "bg-purple-500/10 text-purple-700 border-purple-200",
//     "Pricing and Payments": "bg-green-500/10 text-green-700 border-green-200",
//     "Policies and Procedures": "bg-red-500/10 text-red-700 border-red-200",
//     "General Website & Design": "bg-pink-500/10 text-pink-700 border-pink-200",
//     "Marketing & Online Presence": "bg-orange-500/10 text-orange-700 border-orange-200",
//     "Niche-Specific Questions": "bg-indigo-500/10 text-indigo-700 border-indigo-200"
//   };

//   // Flatten all FAQ items for search
//   const allFaqItems = useMemo(() => {
//     return categories.flatMap(category => 
//       faqData[category].map(item => ({
//         ...item,
//         category,
//         id: `${category}-${item.question}`.replace(/\s+/g, '-').toLowerCase()
//       }))
//     );
//   }, [categories, faqData]);

//   // Filter FAQ items based on search and category
//   const filteredItems = useMemo(() => {
//     let items = allFaqItems;
    
//     if (activeCategory !== "all") {
//       items = items.filter(item => item.category === activeCategory);
//     }
    
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       items = items.filter(item => 
//         item.question.toLowerCase().includes(query) ||
//         item.answer.toLowerCase().includes(query)
//       );
//     }
    
//     return items;
//   }, [allFaqItems, activeCategory, searchQuery]);

//   // Generate JSON-LD structured data from all FAQ items
//   const jsonLdItems = categories.flatMap(category => 
//     faqData[category].map(item => ({
//       "@type": "Question",
//       name: item.question,
//       acceptedAnswer: {
//         "@type": "Answer",
//         text: item.answer
//       }
//     }))
//   );

//   const faqJsonLd = [{
//     "@context": "https://schema.org",
//     "@type": "FAQPage",
//     mainEntity: jsonLdItems
//   }];

//   return (
//     <>
//         <Seo
//           title="FAQ - Pet Care Website Design & Marketing Questions"
//           description="Get answers to common questions about pet care website design, SEO, pricing, and services for dog walkers, groomers, and pet businesses in Northampton."
//           path="/faq"
//           keywords={[
//             "pet care website FAQ",
//             "pet business web design questions",
//             "dog walker website FAQ",
//             "pet groomer website questions",
//             "pet website pricing questions",
//             "pet business SEO FAQ",
//             "veterinary website FAQ",
//             "pet website design help",
//             "Northampton pet web designer FAQ",
//             "pet business website support"
//           ]}
//           breadcrumbs={[{ name: "Home", item: "/" }, { name: "FAQ", item: "/faq" }]}
//           jsonLd={faqJsonLd}
//         />
      
//       <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
//           <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
//           <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
//             <div className="text-center">
//               <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
//                 Frequently Asked Questions
//               </h1>
//               <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
//                 Everything you need to know about our pet care website design and marketing services in Northampton.
//               </p>
//             </div>
            
//             {/* Search Bar */}
//             <div className="mx-auto mt-10 max-w-xl">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                   type="text"
//                   placeholder="Search FAQs..."
//                   value={searchQuery}
//                   onChange={(e) => handleSearchChange(e.target.value)}
//                   className="pl-9 h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="mx-auto max-w-6xl px-4 py-12">
//           <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
//             {/* Category Tabs */}
//             <div className="mb-8 overflow-x-auto">
//               <TabsList className="inline-flex w-max min-w-full justify-start bg-muted/50 p-1">
//                 <TabsTrigger value="all" className="whitespace-nowrap">
//                   All Questions ({allFaqItems.length})
//                 </TabsTrigger>
//                 {categories.map((category) => {
//                   const Icon = categoryIcons[category];
//                   const count = faqData[category].length;
//                   return (
//                     <TabsTrigger key={category} value={category} className="whitespace-nowrap">
//                       <Icon className="mr-2 h-4 w-4" />
//                       {category} ({count})
//                     </TabsTrigger>
//                   );
//                 })}
//               </TabsList>
//             </div>

//             {/* FAQ Content */}
//             <div className="space-y-4">
//               {filteredItems.length === 0 ? (
//                 <Card className="p-8 text-center">
//                   <div className="text-muted-foreground">
//                     <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
//                     <h3 className="text-lg font-medium mb-2">No results found</h3>
//                     <p>Try adjusting your search or browse different categories.</p>
//                   </div>
//                 </Card>
//               ) : (
//                 filteredItems.map((item) => {
//                   const Icon = categoryIcons[item.category];
//                   const colorClass = categoryColors[item.category];
                  
//                   return (
//                     <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
//                       <CardHeader className="pb-3">
//                         <div className="flex items-start justify-between gap-4">
//                           <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
//                             {item.question}
//                           </CardTitle>
//                           <div className="flex items-center gap-2 shrink-0">
//                             <Badge variant="secondary" className={`${colorClass} text-xs`}>
//                               <Icon className="mr-1 h-3 w-3" />
//                               {item.category}
//                             </Badge>
//                           </div>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="pt-0">
//                         <p className="text-muted-foreground leading-relaxed">
//                           {item.answer}
//                         </p>
//                       </CardContent>
//                     </Card>
//                   );
//                 })
//               )}
//             </div>

//             {/* Results Count */}
//             {searchQuery && (
//               <div className="mt-6 text-center text-sm text-muted-foreground">
//                 Showing {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} 
//                 {searchQuery && (
//                   <span> for "{searchQuery}"</span>
//                 )}
//               </div>
//             )}
//           </Tabs>

//           {/* CTA Section */}
//           <div className="mt-16 text-center">
//             <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
//               <CardContent className="p-8">
//                 <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
//                 <p className="text-muted-foreground mb-4">
//                   Can't find what you're looking for? Get in touch with our team.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   <a 
//                     href="tel:+447402342694" 
//                     className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
//                   >
//                     Call +44 7402 342694
//                   </a>
//                   <a 
//                     href="mailto:heryourbarme@live.com" 
//                     className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
//                   >
//                     Send Email
//                   </a>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageCircle,
  CreditCard,
  Shield,
  Palette,
  TrendingUp,
  Target,
} from "lucide-react";
import { trackFAQToggle, trackSearch } from "@/lib/analytics";
import { BASE_URL } from "@/data/services";

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
        question: "What areas do you serve?",
        answer:
          "I am a Northampton-based web designer, but I can work with pet care professionals throughout the UK.",
      },
      {
        question: "What types of pet care businesses do you create websites for?",
        answer:
          "I specialise in creating websites for a wide range of pet care businesses in Northampton, including dog walkers, pet sitters, dog groomers, pet boarding facilities, and more. If you have a unique pet care business, please contact me to discuss your specific needs.",
      },
      {
        question: "Do you have experience working with Wix?",
        answer:
          "Yes, I am a Wix expert and specialise in creating beautiful, functional, and affordable Wix websites for pet care professionals in Northampton.",
      },
      {
        question: "How do I contact you?",
        answer:
          "You can contact me through the contact form on my website, by email at heryourbarme@live.com, or by phone at 07402342694. I'm always happy to answer any questions you may have.",
      },
    ],

    "Services Offered": [
      {
        question: "What services do you offer?",
        answer:
          "I offer a variety of website design and development services tailored for pet care businesses in Northampton, including Wix website design, website maintenance, SEO optimization, and content creation. Please visit my services page for a complete list and detailed descriptions.",
      },
      {
        question: "Can you create an online booking system for my pet care website?",
        answer:
          "Yes, I can integrate online booking systems into your Wix website, making it easy for clients in Northampton to schedule appointments or book your services online.",
      },
      {
        question: "Can you help me with my website's SEO?",
        answer:
          "Absolutely! I can help you optimise your website for search engines, ensuring that your pet care business appears at the top of Google when people search for relevant keywords in Northampton.",
      },
      {
        question: "Do you offer website maintenance services?",
        answer:
          "Yes, I offer ongoing website maintenance packages to ensure your website stays up-to-date, secure, and running smoothly. This includes regular backups, security updates, and content updates.",
      },
    ],
    "Pricing and Payments": [
      {
        question: "What are your rates?",
        answer:
          "My rates vary depending on the complexity of the project and the specific services you require. I offer competitive pricing and transparent quotes for all my web design services. Contact me for a personalised quote for your pet care website.",
      },
      {
        question: "How do I make a payment?",
        answer:
          "I accept various payment methods, including bank transfers, credit cards, and PayPal. We can discuss the best payment option for you during our initial consultation.",
      },
      {
        question: "Do you offer discounts?",
        answer:
          "Yes, I occasionally offer discounts for new clients or for specific services. Contact me to inquire about any current discounts or special offers.",
      },
    ],
    "Policies and Procedures": [
      {
        question: "What is your cancellation policy?",
        answer:
          "I have a clear and fair cancellation policy. Please contact me to discuss the details.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "I strive to provide the highest quality service to all my clients. Please contact me to discuss my refund policy in detail.",
      },
      {
        question: "How do you handle project revisions?",
        answer:
          "I offer a specific number of revisions within each project to ensure your satisfaction. We can discuss the revision process in more detail during our initial consultation.",
      },
    ],
    "General Website & Design": [
      {
        question:
          "I'm worried about my website looking like everyone else's. Can you make mine unique?",
        answer:
          "Absolutely! We understand the importance of standing out. We'll work closely with you to create a custom Wix website that reflects your brand, showcases your unique selling points, and appeals to pet owners in Northampton.",
      },
      {
        question: "What if I already have a website, but it's outdated?",
        answer:
          "No problem! We offer website revamp services to breathe new life into your existing site. We can update your design, improve functionality, and optimise it for search engines to attract more clients in Northampton.",
      },
    ],

    "Marketing & Online Presence": [
      {
        question: "How quickly can I expect to see results from my new website?",
        answer:
          "While results vary, a well-designed and optimised website can start attracting new clients within a few weeks. Factors like your niche, competition, and marketing efforts also play a role. Let's discuss your goals and create a strategy for online success!",
      },
    ],
    "Niche-Specific Questions": [
      {
        question:
          "I offer pet boarding in Northampton. How can a website help me attract more clients during peak seasons?",
        answer:
          "A website can be a powerful tool for attracting pet boarding clients, especially during peak seasons. We can optimise your website for relevant keywords like 'pet boarding Northampton' and create targeted content about holiday pet care. A blog with tips for pet owners preparing for boarding can also attract more visitors to your site.",
      },
    ],
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setTimeout(() => trackSearch(value, "faq_page"), 0);
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    trackFAQToggle(`Category: ${category}`, "navigation", "open");
  };

  const categoryIcons = {
    "General Questions": MessageCircle,
    "Services Offered": Target,
    "Pricing and Payments": CreditCard,
    "Policies and Procedures": Shield,
    "General Website & Design": Palette,
    "Marketing & Online Presence": TrendingUp,
    "Niche-Specific Questions": Target,
  } as const;

  const categoryColors = {
    "General Questions": "bg-blue-500/10 text-blue-700 border-blue-200",
    "Services Offered": "bg-purple-500/10 text-purple-700 border-purple-200",
    "Pricing and Payments": "bg-green-500/10 text-green-700 border-green-200",
    "Policies and Procedures": "bg-red-500/10 text-red-700 border-red-200",
    "General Website & Design": "bg-pink-500/10 text-pink-700 border-pink-200",
    "Marketing & Online Presence":
      "bg-orange-500/10 text-orange-700 border-orange-200",
    "Niche-Specific Questions":
      "bg-indigo-500/10 text-indigo-700 border-indigo-200",
  } as const;

  // Flatten all FAQ items for search
  const allFaqItems = useMemo(() => {
    return categories.flatMap((category) =>
      faqData[category].map((item) => ({
        ...item,
        category,
        id: `${category}-${item.question}`
          .replace(/\s+/g, "-")
          .replace(/[^a-zA-Z0-9\-]/g, "")
          .toLowerCase(),
      }))
    );
  }, [categories, faqData]);

  // Filter FAQ items based on search and category
  const filteredItems = useMemo(() => {
    let items = allFaqItems;

    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return items;
  }, [allFaqItems, activeCategory, searchQuery]);

  // Structured data: FAQPage
  const jsonLdItems = categories.flatMap((category) =>
    faqData[category].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
  );
  const faqJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: jsonLdItems,
    },
  ];

  // Canonical/robots + WebPage & Breadcrumbs JSON-LD
  const { search } = useLocation();
  const hasQueryParam =
    typeof window !== "undefined" &&
    !!new URLSearchParams(search).toString();
  const robots = hasQueryParam ? "noindex,follow" : "index,follow";
  const canonicalUrl = `${BASE_URL}/faq`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: "FAQ - Pet Care Website Design & Marketing Questions",
    inLanguage: "en-GB",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    dateModified: new Date().toISOString(),
    description:
      "Get answers to common questions about pet care website design, SEO, pricing, and services for dog walkers, groomers, and pet businesses in Northampton.",
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: canonicalUrl },
    ],
  };

  return (
    <>
      <Seo
        title="FAQ - Pet Care Website Design & Marketing Questions"
        description="Get answers to common questions about pet care website design, SEO, pricing, and services for dog walkers, groomers, and pet businesses in Northampton."
        path="/faq"
        // SEO hardening
        robots={robots}
        canonical={canonicalUrl}
        jsonLd={[...faqJsonLd, webPageLd, breadcrumbsLd]}
        keywords={[
          "pet care website FAQ",
          "pet business web design questions",
          "dog walker website FAQ",
          "pet groomer website questions",
          "pet website pricing questions",
          "pet business SEO FAQ",
          "veterinary website FAQ",
          "pet website design help",
          "Northampton pet web designer FAQ",
          "pet business website support",
        ]}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "FAQ", item: "/faq" }]}
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Everything you need to know about our pet care website design and
                marketing services in Northampton.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 h-12 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/50"
                />
              </div>
            </div>

            {/* Quick links to popular questions (anchors) */}
            <div className="mx-auto mt-4 max-w-xl">
              <ul className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                {allFaqItems.slice(0, 6).map((q) => (
                  <li key={`link-${q.id}`}>
                    <a
                      className="underline underline-offset-4 hover:text-primary"
                      href={`#${q.id}`}
                    >
                      {q.question}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* Visible breadcrumb */}
          <nav className="mb-4 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>›</li>
              <li className="text-foreground">FAQ</li>
            </ol>
          </nav>

          <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto">
              <TabsList className="inline-flex w-max min-w-full justify-start bg-muted/50 p-1">
                <TabsTrigger value="all" className="whitespace-nowrap">
                  All Questions ({allFaqItems.length})
                </TabsTrigger>
                {categories.map((category) => {
                  const Icon = categoryIcons[category];
                  const count = faqData[category].length;
                  return (
                    <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                      <Icon className="mr-2 h-4 w-4" />
                      {category} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* FAQ Content */}
            <TabsContent value={activeCategory} className="space-y-4">
              {filteredItems.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Search className="mx-auto h-12 w-12 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p>Try adjusting your search or browse different categories.</p>
                  </div>
                </Card>
              ) : (
                filteredItems.map((item) => {
                  const Icon = categoryIcons[item.category as keyof typeof categoryIcons];
                  const colorClass =
                    categoryColors[item.category as keyof typeof categoryColors];

                  return (
                    <Card
                      key={item.id}
                      id={item.id} // anchor for deep-linking
                      className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          {/* Real heading for SEO */}
                          <h2 className="text-lg leading-tight group-hover:text-primary transition-colors">
                            {item.question}
                          </h2>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="secondary" className={`${colorClass} text-xs`}>
                              <Icon className="mr-1 h-3 w-3" />
                              {item.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            {/* Results Count */}
            {searchQuery && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Showing {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}{" "}
                {searchQuery && <span> for "{searchQuery}"</span>}
              </div>
            )}
          </Tabs>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Get in touch with our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+447402342694"
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Call +44 7402 342694
                  </a>
                  <a
                    href="mailto:heryourbarme@live.com"
                    className="inline-flex items-center justify-center px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
