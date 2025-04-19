import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | homestay.com',
  description:
    'Read the terms and conditions for using homestay.com, a complete hostel management system. Understand your rights and responsibilities while using our platform.',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: 'Terms and Conditions | homestay.com',
  },
};

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-50 px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-800">Terms and Conditions</h1>

        <div className="space-y-8 leading-relaxed text-gray-700">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to <strong>homestay.com</strong>. These terms and conditions outline the
              rules and regulations for using our hostel management system. By accessing and using
              this platform, you agree to these terms in full. Please do not continue to use
              <strong>homestay.com</strong> if you do not accept all the terms and conditions
              stated on this page.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">2. User Account and Security</h2>
            <p>
              Users must register an account to access the management features on{' '}
              <strong>homestay.com</strong>. You agree to:
            </p>
            <ul className="ml-6 list-disc">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>
                Keep your account information secure and notify us immediately of unauthorized
                access.
              </li>
              <li>Not use another users account without permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">3. Use of Services</h2>
            <p>
              <strong>homestay.com</strong> is intended solely for managing hostel operations and
              related activities. You agree not to use the platform for:
            </p>
            <ul className="ml-6 list-disc">
              <li>Any unlawful purpose or activities that infringe on others rights.</li>
              <li>Engaging in conduct that could disable or harm our services or reputation.</li>
              <li>Unauthorized data scraping, bulk data extraction, or misuse of the data.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">4. Intellectual Property Rights</h2>
            <p>
              All content and software associated with <strong>homestay.com</strong> is the
              property of its developers or licensors. You may not:
            </p>
            <ul className="ml-6 list-disc">
              <li>
                Republish or redistribute materials from <strong>homestay.com</strong> without
                permission.
              </li>
              <li>
                Reverse engineer, decompile, or otherwise extract the source code of any software on
                our platform.
              </li>
              <li>
                Copy or use any portion of the content for commercial purposes without proper
                authorization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">5. Data Privacy and Security</h2>
            <p>
              We are committed to safeguarding the data you provide. By using our platform, you
              agree to our collection, storage, and use of your information as outlined in our
              Privacy Policy.
            </p>
            <p>
              Unauthorized access or misuse of data will result in termination of your account and
              possible legal action.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, <strong>homestay.com</strong> shall not be
              held liable for any indirect, special, or consequential damages, including but not
              limited to:
            </p>
            <ul className="ml-6 list-disc">
              <li>Data loss, delays, or operational disruptions caused by external factors.</li>
              <li>Unauthorized access to or alterations of your data.</li>
              <li>Third-party conduct affecting your use of the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these terms
              or engage in any actions detrimental to our services or other users.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by the laws of the jurisdiction where{' '}
              <strong>homestay.com</strong> is operated. Any disputes arising from these terms
              will be resolved in the courts of that jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">9. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms and conditions at any time. Continued use
              of the platform after changes are posted signifies your acceptance of the revised
              terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
