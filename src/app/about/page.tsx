"use client";

import React from "react";

const AboutPage = () => {
  return (
    <main className="w-full bg-[#041E23] flex flex-col p-[48px] lg:flex lg:flex-col gap-y-8 justify-center items-start mx-auto max-w-[800px] border rounded-[40px] border-[#0E464F]  lg:p-[48px]">
      <div className="font-primary text-base leading-[150%] font-normal">
        <p className="mb-4">
          <strong>
            Event Ticket Booking UI – Open Source Practice Project
          </strong>
          🎟️
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">Overview</h2>
        <p className="mt-2">
          This is a beginner-friendly yet practical Event Ticket Booking UI
          designed for developers to clone, explore, and build upon. The design
          focuses on a seamless, login-free ticket reservation flow, allowing
          users to book event tickets quickly and efficiently.
        </p>

        <p className="mt-2">
          The project consists of a three-step ticket booking flow, and
          developers can extend it further by integrating payment solutions,
          user authentication (optional), and ticket validation systems.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">
          Flow & Features
        </h2>

        <ol className="list-decimal list-inside mt-2 space-y-3">
          <li>
            <strong>Ticket Selection</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Users can browse available tickets (Free & Paid).</li>
              <li>Ticket options are displayed in a list or card view.</li>
              <li>
                For Free Tickets → Clicking “Get Free Ticket” proceeds to
                attendee details.
              </li>
              <li>
                For Paid Tickets → Clicking “Purchase Ticket” would ideally open
                a payment modal.
              </li>
            </ul>
          </li>

          <li>
            <strong>Attendee Details Form</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Users input their Name, Email, and optional Phone Number.</li>
              <li>Profile picture upload option with preview functionality.</li>
              <li>
                Ticket summary is visible to ensure users review their details
                before submission.
              </li>
            </ul>
          </li>

          <li>
            <strong>Payment or Success Page</strong>
            <ul className="list-disc list-inside ml-4">
              <li>
                <strong>For Free Tickets:</strong> User is taken directly to the
                Ticket Confirmation Page.
              </li>
              <li>
                <strong>For Paid Tickets:</strong> Developers can integrate
                Stripe, Paystack, or Flutterwave to process payments before
                showing the confirmation page.
              </li>
              <li>Upon successful booking, users receive:</li>
              <ul className="list-disc list-inside ml-8">
                <li>A visual ticket preview with a unique QR Code.</li>
                <li>An option to download the ticket as a PDF.</li>
                <li>An email confirmation containing ticket details.</li>
              </ul>
            </ul>
          </li>
        </ol>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">
          How to Build This 🚀
        </h2>
        <p className="mt-2">
          This UI can be implemented using <strong>Next.js or React</strong>.
        </p>

        <h3 className="text-lg md:text-xl font-semibold mt-3">📌 Frontend</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Component Breakdown:</li>
          <ul className="list-disc list-inside ml-8">
            <li>TicketCard.tsx → Displays ticket details</li>
            <li>AttendeeForm.tsx → Captures user details</li>
            <li>PaymentModal.tsx → Handles payment processing</li>
            <li>SuccessScreen.tsx → Shows the final ticket preview</li>
          </ul>
          <li>State Management: Context API, Zustand, or Redux (if needed).</li>
          <li>
            File Handling: Profile picture uploads using Firebase Storage,
            Cloudinary, or URL.createObjectURL().
          </li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold mt-3">
          📌 Backend (Optional)
        </h3>
        <ul className="list-disc list-inside ml-4">
          <li>Node.js & Express or Firebase Functions</li>
          <li>Database: MongoDB, PostgreSQL, or Firebase Firestore</li>
        </ul>

        <h3 className="text-lg md:text-xl font-semibold mt-3">
          📌 Payment Integration
        </h3>
        <ul className="list-disc list-inside ml-4">
          <li>Stripe Checkout (for international transactions)</li>
          <li>Paystack or Flutterwave (for African users)</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mt-4">
          What You’ll Learn 🧑‍💻
        </h2>
        <ul className="list-disc list-inside ml-4">
          <li>File handling & validation (profile picture uploads).</li>
          <li>Dynamic UI updates based on ticket selection.</li>
          <li>Persisting bookings using local state or a backend.</li>
          <li>Integrating payment gateways for ticket purchases.</li>
          <li>
            Generating & validating QR Codes for event check-in (Advanced).
          </li>
        </ul>

        <p className="mt-4">
          <strong>Need Help? Reach Out! 💬</strong>
        </p>
      </div>

      <div className="flex items-center justify-center w-full text-center text-4xl md:text-6xl lg:text-8xl font-primary font-normal mt-10">
        <span>💛 Enjoy</span>
      </div>

      <div className="flex flex-col w-full mt-6 lg:items-center lg:gap-x-6 lg:flex-row gap-y-4 border border-solid border-[#0E464F] bg-[#041E23] rounded-2xl py-4 px-12">
        <a
          target="_blank"
          href="https://www.figma.com/community/file/1470800949188681164/event-ticket-booking-ui-open-source-practice-project"
          className="cancel-btn w-full order-2 lg:order-0 py-3 px-6 transition-colors border rounded-[8px] text-center text-quaternary text-[#24A0B5] border-[#24A0B5]  text-[16px] leading-[24px]"
        >
          Design File
        </a>
        <a
          target="_blank"
          href="https://github.com/Daggahh/hngtask-frontendstg2.git"
          className="next-btn w-full order-0 text-[16px] lg:order-2 py-3 px-6 text-white transition-colors text-center font-quaternary rounded-[8px] bg-[#24A0B5]"
        >
          Github code
        </a>
      </div>
    </main>
  );
};

export default AboutPage;
