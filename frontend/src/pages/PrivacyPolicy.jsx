import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-gray-800 bg-white rounded-lg shadow-lg mt-8 mb-12 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-exdellsNavy mb-3">Privacy Policy</h1>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">1. Introduction</h2>
          <p>
            Exdells India Pvt. Ltd. ("we", "us", or "our") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">2. Information We Collect</h2>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li><span className="font-semibold">Personal Information:</span> Name, email, phone, and any details you provide via forms.</li>
            <li><span className="font-semibold">Usage Data:</span> Pages visited, time spent, browser/device info, and IP address.</li>
            <li><span className="font-semibold">Cookies:</span> We use cookies to enhance your experience and analyze site traffic.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">3. How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li>To provide, operate, and maintain our website and services.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To improve our website, services, and user experience.</li>
            <li>To send you updates, offers, or important notices (with your consent).</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">4. Sharing & Disclosure</h2>
          <p>
            We do <span className="font-semibold">not</span> sell or rent your personal information. We may share data with trusted service providers who help us operate our website, provided they agree to keep your information confidential. We may also disclose information if required by law.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">5. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure. We encourage you to use strong passwords and be vigilant online.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">6. Your Rights</h2>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li>Access, update, or delete your personal information by contacting us.</li>
            <li>Opt out of marketing emails at any time using the unsubscribe link.</li>
            <li>Disable cookies in your browser settings if you prefer.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with a new effective date.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">8. Contact Us</h2>
          <p>
            For questions or requests regarding your privacy, please contact us via our <a href="/contact" className="text-exdellsGold underline hover:text-exdellsOrange">Contact page</a>.
          </p>
        </section>
      </div>
    </section>
  );
}
