import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Subsidy from './pages/Subsidy'
import Contact from './pages/Contact'
import Blog from './pages/Blog'

import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/subsidy" element={<Subsidy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </main>
      <Footer />
      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/919999999999?text=Hello%20Exdells%20Team%2C%20I%20have%20a%20query."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.624.39 3.204 1.13 4.62L2 22l5.56-1.13A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.47 0-2.89-.36-4.13-1.04l-.29-.16-3.3.67.67-3.22-.17-.29A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.13-5.04c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.44.1-.13.2-.5.65-.62.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.98-.59-.52-.99-1.16-1.1-1.36-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.04-.25-.02-.35-.06-.1-.44-1.06-.6-1.45-.16-.39-.32-.34-.44-.35-.11-.01-.25-.01-.39-.01-.13 0-.35.05-.53.23-.18.18-.7.68-.7 1.65s.72 1.92.82 2.06c.1.13 1.42 2.17 3.45 2.96.48.17.85.27 1.14.34.48.1.92.09 1.27.06.39-.04 1.18-.48 1.35-.94.17-.46.17-.85.12-.94-.05-.09-.18-.13-.38-.23z"/></svg>
          Chat on WhatsApp
        </a>
      </div>

      {/* WhatsFlows Widget Example (replace with your actual widget code if needed) */}
      {/* <script src="https://whatsflows.com/widget.js" data-number="919999999999" data-message="Hello Exdells Team, I have a query."></script> */}
    </div>
  )
}
