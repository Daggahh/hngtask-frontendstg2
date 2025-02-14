import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./globals.css";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Event Ticket Booking",
  description: "Book your event tickets",
  icons: {
    icon: "/movie-tickets-svgrepo-com.svg",
    shortcut: "/movie-tickets-svgrepo-com.svg",
    apple: "/movie-tickets-svgrepo-com.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#02191d]">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          closeButton={false}
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "rgba(2, 25, 29, 0.8)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "16px",
          }}
        />
        <div className="event-booking-wrap pt-6">
          <Navbar />

          <div className="event-booking-container flex-grow container mx-auto lg:p-8">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
