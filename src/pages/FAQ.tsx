
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is PrepPair?",
      answer: "PrepPair is an AI-powered interview preparation platform that creates personalized interview guides based on your resume and target job description. It acts as your personal interview coach, helping you prepare effectively for job interviews."
    },
    {
      question: "How does PrepPair work?",
      answer: "Simply upload your resume and the job description you're targeting. Our AI analyzes both documents to create a customized interview preparation guide including likely questions, suggested answers, and strategic insights."
    },
    {
      question: "Is PrepPair free to use?",
      answer: "PrepPair offers one free guide generation for new users. After that, you can subscribe to our premium plans to access unlimited guides and additional features."
    },
    {
      question: "How accurate are the interview guides?",
      answer: "Our AI is trained on thousands of real interview experiences and continuously learns from user feedback. While every interview is unique, our guides have helped thousands of users successfully prepare for their interviews."
    },
    {
      question: "Can I use PrepPair for any type of job?",
      answer: "Yes! PrepPair works for various industries and job levels, from entry-level positions to executive roles. Our AI adapts the content based on the specific requirements of your target role."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container py-16">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
