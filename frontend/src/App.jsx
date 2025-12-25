import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CustomerChatWidget from './components/CustomerChatWidget'
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
      {/* Customer Chat Widget (Exdells branding) */}
      <CustomerChatWidget />

      {/* WhatsFlows Widget Example (replace with your actual widget code if needed) */}
      {/* <script src="https://whatsflows.com/widget.js" data-number="919216045023" data-message="Hello Exdells Team, I have a query."></script> */}
    </div>
  )
}
