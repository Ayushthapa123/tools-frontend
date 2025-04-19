import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | homestay.com',
  description: 'Understand how homestay.com collects, uses, and safeguards your information.',
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: '/logo512.png',
    title: 'Privacy Policy | homestay.com',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-[1800px] p-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">Last Updated: 2024/7/7</p>

      <p className="mb-4">
        Welcome to <strong>homestay.com</strong>. At homestay.com, we are committed to
        protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our platform, including both our web application and
        mobile app (collectively, the “Service”). By using our Service, you agree to the terms of
        this privacy policy. If you do not agree, please do not use the Service.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect various types of information in connection with your use of the Service, such
        as:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Personal Data:</strong> Information that personally identifies you, like your
          name, email address, phone number, and any information you provide when creating an
          account.
        </li>
        <li>
          <strong>Usage Data:</strong> Details of your interactions with the Service, including
          login times, viewed content, and other usage statistics.
        </li>
        <li>
          <strong>Device Data:</strong> Information about the device you use to access our Service,
          such as IP address, browser type, device type, and operating system.
        </li>
        <li>
          <strong>Financial Data:</strong> Payment information (e.g., credit card details) if you
          make purchases within the Service, secured through our third-party payment processors.
        </li>
      </ul>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">2. Use of Your Information</h2>
      <p className="mb-4">
        We use your information to provide and improve our Service. Specifically, we may use your
        data to:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>Create and manage your account and user profile.</li>
        <li>
          Facilitate hostel management features, including reservations, room assignments, and
          communications with hostel staff.
        </li>
        <li>Process transactions and deliver the services you request.</li>
        <li>
          Send notifications, updates, and other relevant communications regarding your usage.
        </li>
        <li>Analyze usage trends to improve our Service and provide a better experience.</li>
        <li>Ensure security and prevent fraudulent activities on our platform.</li>
      </ul>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">3. Sharing of Your Information</h2>
      <p className="mb-4">We may share your information with third parties as follows:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Service Providers:</strong> Trusted third-party vendors that assist us with
          essential services like payment processing, data hosting, analytics, and customer support.
        </li>
        <li>
          <strong>Legal Requirements:</strong> If required by law or to protect our rights, we may
          disclose your information in response to legal requests or to safeguard the safety of our
          users.
        </li>
        <li>
          <strong>Business Transactions:</strong> In the event of a merger, acquisition, or asset
          sale, your information may be transferred as part of that transaction.
        </li>
      </ul>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">4. Security of Your Information</h2>
      <p className="mb-4">
        We implement a variety of security measures to protect your information. However, while we
        strive to use commercially acceptable means to protect your data, we cannot guarantee its
        absolute security.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">5. User Rights</h2>
      <p className="mb-4">
        Depending on your location, you may have certain rights regarding your personal data,
        including access, correction, or deletion of your data. If you wish to exercise any of these
        rights, please contact us.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page. By continuing to use the Service, you accept the updated terms.
      </p>

      <h2 className="mb-4 mt-6 text-2xl font-semibold">7. Contact Us</h2>
      <p className="mb-4">For questions or concerns about this Privacy Policy, contact us at:</p>
      <address className="mb-4 not-italic">
        <strong>homestay.com</strong>
        <br />
        Email:{' '}
        <a href="mailto:support@homestay.com" className="text-blue-600">
          support@homestay.com
        </a>
      </address>

      <p className="text-sm text-gray-500">
        This privacy policy was created by the homestay.com team.
      </p>
    </div>
  );
}
