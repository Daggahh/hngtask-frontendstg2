"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideVariants } from "@/utils/animationVariants";
import regImage from "@/assets/images/Property1Reg.svg";
import vipImage from "@/assets/images/Property1VIP.svg";
import vvipImage from "@/assets/images/Property1VVIP.svg";
import chevrondown from "@/assets/images/chevron-down.svg";
import ticket from "@/assets/images/Subtract.svg";
import barcode from "@/assets/images/BarCode.svg";

import "@/styles/Form.css";
import { CloudUploadOutlined, MailOutlined } from "@ant-design/icons";
import Loader from "./Loader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

type StepProps = {
  nextStep?: () => void;
  prevStep?: () => void;
};

const ticketTypes = [
  { price: "Free", label: "REGULAR ACCESS", image: regImage },
  { price: "$50", label: "VIP ACCESS", image: vipImage },
  { price: "$150", label: "VVIP ACCESS", image: vvipImage },
];

const StepOne: React.FC<
  StepProps & { progress: string; direction: number }
> = ({ nextStep, progress, direction }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [iconRotated, setIconRotated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTicket = localStorage.getItem("ticketType");
    const storedCount = localStorage.getItem("ticketQuantity");
    if (storedTicket) setSelectedTicket(storedTicket);
    if (storedCount) setTicketCount(Number(storedCount) ?? 1);
  }, []);

  const handleNext = () => {
    if (!selectedTicket || !ticketCount) {
      toast.warn("Please select a ticket type and quantity before proceeding!");
      return;
    }
    nextStep?.();
  };

  const handleTicketSelect = (ticket: string) => {
    setSelectedTicket(ticket);
    localStorage.setItem("ticketType", ticket);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setIconRotated(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleTicketCount = (count: number) => {
    setTicketCount(count);
    localStorage.setItem("ticketQuantity", count.toString());
    setDropdownOpen(false);
    setIconRotated(false);
  };

  return (
    <main className="flex flex-col justify-center items-start w-full p-[24px] max-w-[700px] mx-auto bg-[#041E23] border border-[#0E464F] rounded-[32px] lg:flex lg:flex-col gap-y-8 lg:p-[48px]">
      <div className="w-full items-start gap-y-3">
        <div className="flex flex-col items-start md:flex-row md:justify-between mb-4 gap-y-3 lg:gap-y-0">
          <h1 className="text-[32px] font-normal leading-normal shadow-sm text-white font-quaternary lg:text-[32px]">
            Ticket Selection
          </h1>
          <p className="text-base leading-[150%] font-primary text-[#FAFAFA]">
            Step 1/3
          </p>
        </div>
        <div className="relative h-1 bg-[#0E464F] rounded">
          <div
            className={`absolute left-0 inset-y-0 rounded bg-[#24A0B5] transition-all duration-700 ease-in-out ${progress}`}
          ></div>
        </div>
      </div>
      <motion.div
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        className="flex flex-col gap-y-8 w-full sm:p-[18px] sm:border sm:border-[#0E464F] sm:bg-[#08252B] sm:rounded-[32px]"
      >
        <div
          className="relative flex flex-col gap-y-2 p-6 text-center rounded-[24px] bg-opacity-10 backdrop-blur-md border-[2px] border-t-0 border-[#07373F] sm:p-6 sm:space-y-2"
          style={{
            background:
              "radial-gradient(57.42% 106.59% at 14.02% 32.06%, #24a0b533, #24a0b500), #0a0c111a",
          }}
        >
          <div className="mb-[40px] flex flex-col gap-y-2 sm:mb-0">
            <h2 className="text-[48px] h-fit leading-[150%] text-[#FFFFFF] sm:text-[62px] font-secondary">
              Techember Fest &apos;25
            </h2>
            <p className="w-[239px] lg:w-[340px] mx-auto text-center text-[14px] lg:text-[16px] text-[#FAFAFA] leading-[150%] font-primary">
              Join us for an unforgettable experience at{" "}
              <span className="font-secondary">Techember Fest</span>! Secure
              your spot now.
            </p>
            <div className="flex flex-col gap-y-1 lg:flex-row lg:items-center lg:justify-center lg:gap-x-4">
              <span className="text-base lg:text-lg font-primary leading-[150%] text-[#FAFAFA]">
                📍 [Event Location]
              </span>
              <span className="hidden lg:block">| |</span>
              <p className="text-base font-primary leading-[150%] text-[#FAFAFA]">
                March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>
        </div>
        <hr className="h-1 bg-[#07373F] border-t-0" />
        <div className="flex flex-col gap-y-2">
          <h3 className="text-base font-primary font-normal leading-[150%] text-[#FAFAFA]">
            Select Ticket Type:
          </h3>
          <div className="flex flex-col w-full gap-y-6 p-4 border border-[#07373F] rounded-[24px] bg-[#052228] md:flex-row md:justify-between md:gap-x-6">
            {ticketTypes.map(({ price, label, image }, index) => {
              const isSelected = selectedTicket === label;
              return (
                <div
                  key={index}
                  onClick={() => handleTicketSelect(label)}
                  className={`flex flex-col w-full h-full p-3 gap-y-3 items-start rounded-[12px] transition-colors cursor-pointer border min-w-[158px] ${
                    isSelected ? "bg-[#12464E]" : "bg-transparent"
                  } hover:bg-[#2C545B] border-[#197686]`}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="text-[24px] font-semibold text-white font-primary">
                      {price}
                    </div>
                    <Image
                      src={image}
                      alt={`Access type ${index}`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <h4 className="text-base text-[#FAFAFA] font-primary">
                    {label}
                  </h4>
                  <p className="text-[14px] font-primary text-[#FAFAFA]">
                    20/52
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-base font-primary font-normal leading-[150%]">
            Number of Tickets
          </label>
          <div className="relative" ref={dropdownRef}>
            <button
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                setIconRotated(!iconRotated);
              }}
              className="flex justify-between items-center w-full p-3 border border-[#07373F] rounded-[12px] bg-transparent hover:bg-[#197686]"
            >
              <span>{ticketCount}</span>
              <Image
                src={chevrondown}
                alt="chevrondown"
                className={`w-6 h-6 text-white transition-transform ${
                  iconRotated ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 w-full p-2 mt-2 bg-opacity-10 backdrop-blur-md border border-[#07373F] rounded-[12px] z-50">
                {[1, 2, 3, 4, 5].map((count) => (
                  <div
                    key={count}
                    onClick={() => handleTicketCount(count)}
                    className="p-2 text-center text-white cursor-pointer hover:bg-[#197686] rounded-md transition"
                  >
                    {count}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-4 lg:flex-row lg:items-center lg:gap-x-6">
          <button className="cancel-btn w-full py-3 px-6 text-[16px] text-center text-[#24A0B5] font-quaternary border border-[#24A0B5] rounded-[8px] transition-colors">
            Cancel
          </button>
          <button
            className="next-btn w-full py-3 px-6 text-[16px] text-white text-center font-quaternary rounded-[8px] bg-[#24A0B5] transition-colors"
            type="button"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </motion.div>
    </main>
  );
};

const StepTwo: React.FC<
  StepProps & { progress: string; direction: number }
> = ({ nextStep, prevStep, progress, direction }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");
  const [dragging, setDragging] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<string>("Free");

  useEffect(() => {
    const storedTicket = localStorage.getItem("ticketType");
    if (storedTicket) {
      if (storedTicket.includes("VIP")) {
        setSelectedTicket(storedTicket.split(" ")[0]);
      } else {
        setSelectedTicket("Free");
      }
    }
  }, []);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase());
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement> | { target: { files: File[] } }
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warn("Only image files are allowed.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dmmz1qe2d/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const event = { target: { files: [file] } };
      handleFileChange(event);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const customToastOptions = {
      style: {
        background: "rgba(2, 25, 29, 0.8)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        borderRadius: "8px",
        padding: "12px 16px",
        fontSize: "16px",
      },
      autoClose: 3000,
      hideProgressBar: false,
      closeButton: false,
    };
    if (!name.trim()) {
      toast.warn("Please enter your name.", customToastOptions);
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      toast.warn("Please enter a valid email address.", customToastOptions);
      return;
    }
    if (!imageUrl) {
      toast.warn("Please upload a profile photo.", customToastOptions);
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("imageUrl", imageUrl);
    localStorage.setItem("specialRequest", specialRequest);

    console.log("Form submitted with:", {
      name,
      email,
      specialRequest,
      imageUrl,
    });
    nextStep?.();
  };

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setImageUrl(localStorage.getItem("imageUrl") || null);
    setSpecialRequest(localStorage.getItem("specialRequest") || "");
  }, []);

  return (
    <main className="w-full bg-[#041E23] flex flex-col p-[24px] lg:flex lg:flex-col gap-y-8 justify-center items-start mx-auto max-w-[700px] border rounded-[32px] border-[#0E464F] lg:p-[48px]">
      <div className="items-start w-full gap-y-3">
        <div className="flex items-center gap-y-3 mb-4 lg:gap-y-0 justify-between flex-row">
          <h1 className="text-2xl leading-[auto] font-normal lg:text-[32px] font-quaternary">
            Attendee Details
          </h1>
          <p className="text-base font-primary text-[#FAFAFA] leading-[150%]">
            Step 2/3
          </p>
        </div>
        <div className="relative h-1 rounded bg-[#0E464F]">
          <div
            className={`absolute inset-y-0 left-0 rounded bg-[#24A0B5] transition-all duration-700 ease-in-out ${progress}`}
          ></div>
        </div>
      </div>

      <motion.form
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        className="lg:p-8 w-full lg:border flex lg:bg-[#08252B] flex-col lg:border-[#0E464F] lg:rounded-[32px] gap-y-8"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Profile Photo Upload */}
        <div
          className={`rounded-[24px] border border-[#07373F] bg-[#052228] px-6 pt-6 pb-12 flex flex-col items-start gap-y-8 cursor-pointer ${
            dragging ? "border-4 border-dashed border-[#24A0B5]" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="presentation"
          tabIndex={0}
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          <p className="text-[#FAFAFA] font-primary text-base">
            Upload Profile Photo
          </p>
          <input
            accept="image/*,.jpeg,.jpg,.png,.gif,.webp"
            tabIndex={-1}
            id="fileUpload"
            type="file"
            className="opacity-0"
            onChange={handleFileChange}
            hidden
          />
          <div className="lg:bg-[#000000] lg:bg-opacity-20 w-full h-[200px] flex items-center justify-center">
            <div className="group relative mx-auto flex justify-center items-center w-[240px] h-[240px] overflow-hidden aspect-square rounded-[32px] border-[4px] border-[#24A0B5] bg-[#0E464F] border-opacity-50">
              {uploading ? (
                <Loader />
              ) : imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Uploaded Avatar"
                    className="w-full h-full object-cover rounded-[32px]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CloudUploadOutlined className="text-white text-4xl" />
                    <span className="text-center font-primary text-[#fafafa]">
                      Drag & drop or click to upload
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 bg-[#0E464F] w-full h-full">
                  <CloudUploadOutlined className="cloud" />
                  <span className="text-center font-primary text-[#fafafa]">
                    Drag & drop or click to upload
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="h-1 bg-[#07373F] border-t-0" />

        {/* Name Input */}
        <div className="space-y-2">
          <p className="text-[#fafafa] font-primary font-normal leading-[150%]">
            Enter your name
          </p>
          <input
            required
            className="h-12 bg-transparent w-full active:outline-none outline-none rounded-[12px] border border-[#07373F] p-3"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <p className="text-[#fafafa] font-normal font-primary">
            Enter your email *
          </p>
          <div className="flex rounded-[12px] gap-x-2 p-3 border border-[#07373F] text-white items-center">
            <MailOutlined className="mail-icon" />
            <input
              required
              className="bg-transparent w-full active:outline-none outline-none rounded-[12px] p-1 pt-0 pb-0 placeholder:text-white font-normal"
              placeholder="hello@avioflagos.io"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>

        {/* Special Request Textarea */}
        <div className="space-y-2">
          <p className="text-[#fafafa] font-primary font-normal">
            Special request?
          </p>
          <div className="flex rounded-[12px] h-[127px] p-3 border border-[#07373F] items-center">
            <textarea
              rows={5}
              className="resize-none bg-transparent w-full active:outline-none outline-none rounded-[12px] h-full placeholder:text-[#fafafa] p-1"
              placeholder="Textarea"
              name="specialRequest"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:items-center lg:gap-x-6 lg:flex-row gap-y-4">
          <button
            type="button"
            className="cancel-btn w-full order-2 lg:order-0 py-3 px-6 transition-colors border rounded-[8px] text-center text-quaternary text-[#24A0B5] border-[#24A0B5] text-[16px] leading-[150%]"
            onClick={prevStep}
          >
            Back
          </button>
          <button
            type="submit"
            className="next-btn w-full order-0 text-[16px] lg:order-2 py-3 px-6 text-white transition-colors text-center font-quaternary rounded-[8px] bg-[#24A0B5]"
          >
            Get My {selectedTicket} Ticket
          </button>
        </div>
      </motion.form>
    </main>
  );
};

const StepThree: React.FC<
  StepProps & {
    progress: string;
    direction: number;
    handleBookAnother: () => void;
  }
> = ({ progress, direction, handleBookAnother }) => {
  const [ticketDetails, setTicketDetails] = useState({
    name: "",
    email: "",
    imageUrl: "",
    ticketType: "",
    ticketQuantity: "",
    specialRequest: "",
  });

  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTicketDetails({
      name: localStorage.getItem("name") || "N/A",
      email: localStorage.getItem("email") || "N/A",
      imageUrl: localStorage.getItem("imageUrl") || "",
      ticketType: localStorage.getItem("ticketType") || "Regular",
      ticketQuantity: localStorage.getItem("ticketQuantity") || "1",
      specialRequest:
        localStorage.getItem("specialRequest") || "No special requests",
    });
  }, []);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      width: ticketRef.current.scrollWidth,
      height: ticketRef.current.scrollHeight,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save("Event_Ticket.pdf");

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", imgData);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmmz1qe2d/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      localStorage.setItem("ticketImage", data.secure_url);
      toast.success("Ticket saved to Cloudinary!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload ticket.");
    }
  };

  return (
    <main className="w-full bg-[#08252B] flex flex-col p-[24px] lg:flex lg:flex-col gap-y-8 justify-center items-start mx-auto max-w-[700px] border rounded-[32px] border-[#0E464F]  lg:p-[48px]">
      <div className="items-start w-full gap-y-3">
        <div className="flex items-center mb-4 gap-y-3 lg:gap-y-0 justify-between flex-row">
          <h1 className="text-2xl font-normal lg:text-[32px] font-quaternary">
            Ready
          </h1>
          <p className="text-base font-primary text-[#FAFAFA] leading-[150%]">
            Step 3/3
          </p>
        </div>
        <div className="relative h-1 rounded bg-[#0E464F]">
          <div
            className={`absolute inset-y-0 left-0 rounded bg-[#24A0B5] transition-all duration-700 ease-in-out ${progress}`}
          ></div>
        </div>
      </div>
      <motion.div
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        className="flex flex-col items-center justify-center mx-auto gap-y-4"
      >
        <p className="text-2xl leading-[140%] font-primary text-center font-bold lg:font-normal text-white lg:font-tertiary lg:text-[32px]">
          Your Ticket is Booked!
        </p>
        <p className="hidden lg:block text-2xl leading-[150%] text-[#fafafa] text-center  font-primary">
          Check your email for a copy or you can
          <span className="font-bold"> download</span>
        </p>
        <p className="lg:hidden text-base leading-[150%] text-[#fafafa] text-center font-normal font-primary">
          You can download or Check your email for a copy
        </p>
      </motion.div>
      <motion.div
        ref={ticketRef}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        className="relative w-full h-full pt-[21px] pb-8 "
      >
        <Image
          src={ticket}
          alt="ticket"
          className="absolute -translate-x-1/2 left-1/2"
        />
        <div className="relative flex flex-col items-center justify-center w-[260px]  z-999 rounded-[16px] p-[14px] border border-[#24A0B5] bg-[#031E21] bg-opacity-10 backdrop-blur-[2px] mt-[20px] mx-auto">
          <div className="flex flex-col gap-y-[20px]">
            <div>
              <h3 className="text-[34px] font-normal leading-[100%] font-secondary text-center">
                Techember Fest ”25
              </h3>
              <div className="flex flex-col font-normal items-center justify-center p-1 text-center gap-y-1 font-primary text-[10px] text-white leading-[150%]">
                <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p>📅 March 15, 2025 | 7:00 PM</p>
              </div>
            </div>
            <div className="relative overflow-hidden flex items-center justify-center w-[140px] aspect-square rounded-[12px] mx-auto border-[4px] border-[#24A0B5] shadow-xl">
              <img
                src={ticketDetails.imageUrl}
                alt="user-img-upload"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col p-1 rounded-[8px] border w-[224px] border-[#133D44] bg-[#08343C] ">
              <div className="flex gap-x-2 border-b border-[#12464E] w-full">
                <div className=" border-r border-[#12464E] w-[100px] p-1 flex flex-col gap-y-1 ">
                  <label className="text-white/30 font-primary font-normal text-[10px] leading-[150%] ">
                    Enter your name
                  </label>
                  <p className="font-primary text-[12px] truncate font-bold leading-[150%] text-white">
                    {ticketDetails.name}
                  </p>
                </div>
                <div className="flex flex-col w-[100px] p-1 gap-y-1">
                  <label className=" text-white/30 font-primary font-normal text-[10px] leading-[150%] ">
                    Enter your email *
                  </label>
                  <p className="font-primary truncate text-[12px] font-bold leading-[150%] text-white">
                    {ticketDetails.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-2 border-b border-[#12464E] ">
                <div className=" w-[100px] border-r border-[#12464E] p-1 flex flex-col gap-y-1">
                  <label className="text-white/30 font-primary font-normal text-[10px] leading-[150%] ">
                    Ticket Type:
                  </label>
                  <p className="font-primary text-[12px] font-normal leading-[150%] text-white">
                    {ticketDetails.ticketType}
                  </p>
                </div>
                <div className="flex flex-col p-1 gap-y-1 w-[100px]">
                  <label className="text-white/30 font-primary font-normal text-[10px] leading-[150%] ">
                    Ticket for :
                  </label>
                  <p className="font-primary text-[12px] font-normal leading-[150%] text-white">
                    {ticketDetails.ticketQuantity}
                  </p>
                </div>
              </div>
              <div className="flex flex-col p-2 gap-y-1 h-[62px]">
                <label className="text-white/30 font-primary font-normal text-[10px] leading-[150%] ">
                  Special request?
                </label>
                <textarea
                  disabled
                  className="font-primary text-[10px] font-normal leading-[150%] overflow-y-auto bg-transparent  text-white resize-none"
                >
                  {ticketDetails.specialRequest || "No special requests"}
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="relative md:mt-[60px] mt-[72px] flex items-center justify-center">
          <Image
            src={barcode}
            alt="barcode"
            className="absolute -translate-x-1/2  left-1/2"
          />
        </div>
      </motion.div>
      <div className="flex flex-col w-full mt-6 lg:items-center lg:gap-x-6 lg:flex-row gap-y-4">
        <button
          className="cancel-btn w-full order-2 lg:order-0 py-3 px-6 transition-colors border rounded-[8px] text-center text-quaternary text-[#24A0B5] border-[#24A0B5]  text-[16px] leading-[150%]"
          onClick={handleDownload}
        >
          Download Ticket
        </button>
        <button
          className="next-btn w-full order-0 text-[16px] lg:order-2 py-3 px-6 text-white transition-colors text-center font-quaternary rounded-[8px] bg-[#24A0B5] "
          type="button"
          onClick={handleBookAnother}
        >
          Book Another Ticket
        </button>
      </div>
    </main>
  );
};

const Form: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState("w-1/3");
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (typeof window !== undefined) {
      const savedStep = Number(localStorage.getItem("currentStep")) || 1;
      setStep(savedStep);
      setProgress(
        savedStep === 1 ? "w-1/3" : savedStep === 2 ? "w-2/3" : "w-full"
      );
    }
  }, []);

  const handleBookAnother = () => {
    const previousBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    const currentBooking = {
      ticketType: localStorage.getItem("ticketType") || "Free",
      ticketQuantity: localStorage.getItem("ticketQuantity") || 1,
      imageUrl: localStorage.getItem("imageUrl") || "",
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      specialRequest: localStorage.getItem("specialRequest") || "",
    };

    previousBookings.push(currentBooking);

    localStorage.setItem("bookings", JSON.stringify(previousBookings));

    localStorage.removeItem("ticketType");
    localStorage.removeItem("ticketQuantity");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("specialRequest");
    localStorage.setItem("currentStep", "1");

    setStep(1);
    setDirection(-1);
  };

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => {
      const newStep = prev + 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentStep", newStep.toString());
      }
      return newStep;
    });

    setTimeout(() => {
      setProgress((prevProgress) => {
        if (step === 1) return "w-2/3";
        if (step === 2) return "w-full";
        return prevProgress;
      });
    }, 100);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => {
      const newStep = prev - 1;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentStep", newStep.toString());
      }
      return newStep;
    });

    setTimeout(() => {
      setProgress((prevProgress) => {
        if (step === 3) return "w-2/3";
        if (step === 2) return "w-1/3";
        return prevProgress;
      });
    }, 100);
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      {step === 1 && (
        <StepOne
          nextStep={nextStep}
          progress={progress}
          direction={direction}
        />
      )}
      {step === 2 && (
        <StepTwo
          prevStep={prevStep}
          nextStep={nextStep}
          progress={progress}
          direction={direction}
        />
      )}
      {step === 3 && (
        <StepThree
          progress={progress}
          handleBookAnother={handleBookAnother}
          direction={direction}
        />
      )}
    </AnimatePresence>
  );
};

export default Form;
