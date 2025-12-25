import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-gray-800 bg-white rounded-lg shadow-lg mt-8 mb-12 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-exdellsNavy mb-3">Terms &amp; Conditions</h1>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Exdells India Pvt. Ltd. website, you agree to comply with and be bound by these Terms &amp; Conditions. If you do not agree, please do not use our site.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">2. Use of Website</h2>
          <ul className="list-disc ml-6 text-base space-y-1">
            <li>You must be at least 18 years old or have parental consent to use this site.</li>
            <li>You agree not to use the site for any unlawful, harmful, or abusive purpose.</li>
            <li>Content is for general information only and may change without notice.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">3. Intellectual Property</h2>
          <p>
            All content, trademarks, and materials on this website are the property of Exdells India Pvt. Ltd. or its licensors. You may not copy, reproduce, or distribute any content without written permission.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">4. Limitation of Liability</h2>
          <p>
            We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website. The site is provided "as is" without warranties of any kind.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the content or privacy practices of those sites.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">6. Changes to Terms</h2>
          <p>
            We may update these Terms &amp; Conditions at any time. Changes will be posted on this page with a new effective date.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Rajasthan, India, without regard to conflict of law principles.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-exdellsGold mb-2">8. Contact Us</h2>
          <p>
            For any questions about these Terms &amp; Conditions, please contact us via our <a href="/contact" className="text-exdellsGold underline hover:text-exdellsOrange">Contact page</a>.
          </p>
        </section>
      </div>
    </section>
  );
}
