"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SeatDetails } from "../components/seatDetails";

type Guest = {
  name: string;
  table: string;
  seat: string;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    async function fetchGuestList() {
      try {
        const response = await fetch("/api/guests");
        const result = await response.json();

        if (result.status === "success") {
          setGuests(result.allGuests);
        } else {
          setApiError("Unable to load guest list. Please look for an usher.");
        }
      } catch (err) {
        setApiError(`Network error. Please try refreshing.`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGuestList();
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const filteredSuggestions =
    query.length >= 1 && !selectedGuest
      ? guests.filter((guest) => guest.name.toLowerCase().includes(query))
      : [];

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchQuery(guest.name);
  };

  const handleSearch = () => {
    const guest = guests.find((g) => g.name.toLowerCase() === query);

    if (guest) {
      handleSelectGuest(guest); }
  };

  const handleSearchAgain = () => {
    setSelectedGuest(null);
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col items-center gap-5 px-6 pt-10">
      <section className="w-full space-y-2 md:w-1/2 lg:w-1/4">
        <div className="w-full h-52 bg-gray-500 rounded-xl relative overflow-hidden">
          <Image
            src="/TJ.jpg"
            alt="Tayielolu and Joshua engagement"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover absolute"
          />
        </div>

        <div>
          <h1 className="font-black">Welcome to our wedding</h1>

          <p className="text-xs text-gray-500 leading-relaxed">
            We are happy to have you celebrate this special day with us. We hope
            you have an amazing time, as much as we know we will have. Please be
            respectful to all of our guests and staff. Once again, welcome to
            the beginning of our forever. Enjoy!
          </p>
        </div>
      </section>

      <section className="w-full md:w-1/2 lg:w-1/4">
        {/* Loading / Error Overlays */}
        {isLoading ? (
          <p className="text-xs text-gray-400 italic text-center py-4 animate-pulse">
            Loading guest list...
          </p>
        ) : apiError ? (
          <p className="text-xs text-red-500 font-medium text-center py-4">
            {apiError}
          </p>
        ) : !selectedGuest ? (
          <div className="space-y-2">
            <h3 className="font-black text-sm">
              Input your name to view your seat
            </h3>

            <div className="relative">
              <div className="flex items-center gap-4 border border-gray-400 rounded-xl px-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  className="w-full py-3 text-base outline-none"
                />

                <button
                  type="button"
                  onClick={handleSearch}
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    className="w-5 h-5 rotate-45"
                  >
                    <path d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z" />
                  </svg>
                </button>
              </div>

              {filteredSuggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden z-50 max-h-48 overflow-y-auto">
                  {filteredSuggestions.map((guest) => (
                    <li
                      key={guest.name}
                      onClick={() => handleSelectGuest(guest)}
                      className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 border-b border-b-gray-200 last:border-b-0"
                    >
                      {guest.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="border border-gray-300 rounded-xl">
              <div className="border-b border-gray-300">
                <h3 className="px-4 py-3 font-black text-sm">
                  Your Seat Details
                </h3>
              </div>

              <div className="px-4 py-3">
                <SeatDetails field="Name" value={selectedGuest.name} />
                <SeatDetails field="Table" value={selectedGuest.table} />
                <SeatDetails field="Seat" value={selectedGuest.seat} />
              </div>
            </div>

            <button
              onClick={handleSearchAgain}
              className="text-blue-500 text-xs underline w-fit"
            >
              Not your name? Search again.
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
