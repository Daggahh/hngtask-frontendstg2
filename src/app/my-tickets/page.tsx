"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TicketPage = () => {
  const [ticketImage, setTicketImage] = useState<string | null>(null);

  useEffect(() => {
    setTicketImage(localStorage.getItem("ticketImage"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#08252B] border rounded-[32px] border-[#0E464F] text-white">
      <h1 className="text-2xl font-bold mb-4 font-primary">Your Ticket</h1>
      {ticketImage ? (
        <img
          src={ticketImage}
          alt="Saved Ticket"
          className="w-80 rounded-lg shadow-lg"
        />
      ) : (
        <p>No ticket found.</p>
      )}
    </div>
  );
};

export default TicketPage;
