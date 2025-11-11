"use client";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

const menuItems = [
  { label: "MENU", href: "/food-menu", type: "link" },
  { label: "RESERVATION", href: "#reservation" },
];

const bookLinks = [
  {
    href: "https://www.sevenrooms.com/explore/asian/reservations/create/search/",
    title: "Book for Asian",
  },
  {
    href: "https://www.sevenrooms.com/explore/italian/reservations/create/search/",
    title: "Book for Italian",
  },
];

const iconStyles = "w-8 h-8 fill-[#BDBDB9] transition group-hover:fill-white";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className={iconStyles} aria-hidden="true">
    <path d="M12 7.35a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3Zm0 7.65a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6.15-7.8a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0ZM21 7.62c-.05-1.09-.3-2.05-1.09-2.84S18.47 3.85 17.38 3.8C16.24 3.73 7.76 3.73 6.62 3.8 5.53 3.85 4.57 4.1 3.78 4.89 3 5.68 2.75 6.64 2.7 7.73 2.63 8.87 2.63 15.13 2.7 16.27c.05 1.09.3 2.05 1.09 2.84.79.79 1.75 1.04 2.84 1.09 1.14.07 9.62.07 10.76 0 1.09-.05 2.05-.3 2.84-1.09.79-.79 1.04-1.75 1.09-2.84.07-1.14.07-7.4 0-8.54ZM19.26 18a2.41 2.41 0 0 1-1.36 1.36c-.94.37-3.18.28-5.9.28s-4.96.08-5.9-.28A2.41 2.41 0 0 1 4.74 18c-.37-.94-.28-3.18-.28-5.9s-.08-4.96.28-5.9A2.41 2.41 0 0 1 6.1 4.84c.94-.37 3.18-.28 5.9-.28s4.96-.08 5.9.28A2.41 2.41 0 0 1 19.26 6.1c.37.94.28 3.18.28 5.9s.09 4.96-.28 5.9Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className={iconStyles} aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.56 9.87v-6.98H7.9V12h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.76l-.44 2.89h-2.32v6.98A10 10 0 0 0 22 12Z" />
  </svg>
);

const EXIT_DURATION_MS = 1600;  // match CSS close wipe (1.6s)

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [bookMenuOpen, setBookMenuOpen] = useState(false);
  const [overlayBookOpen, setOverlayBookOpen] = useState(false);
  const bookMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bookMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        bookMenuRef.current &&
        event.target instanceof Node &&
        !bookMenuRef.current.contains(event.target)
      ) {
        setBookMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [bookMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setBookMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBookToggle = useCallback(() => {
    setBookMenuOpen((prev) => !prev);
  }, []);

  const handleBookClose = useCallback(() => {
    setBookMenuOpen(false);
    setOverlayBookOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setBookMenuOpen(false);

    if (open) {
      setIsClosing(true);
      setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
      }, EXIT_DURATION_MS);
    } else {
      setOpen(true);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    if (!open) return;
    setIsClosing(true);
    setOverlayBookOpen(false);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, EXIT_DURATION_MS);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setBookMenuOpen(false);
    setOverlayBookOpen(false);
  }, [open]);

  const handleLogoClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    handleClose();
  }, [handleClose]);

  const isOverlayVisible = open || isClosing;
  const overlayClass = open && !isClosing ? "menu-radial-reveal" : isClosing ? "menu-close-wipe" : "";

  return (
    <header className="absolute top-0 left-0 w-full z-30 px-6 md:px-10 py-16 bg-transparent flex items-center justify-between" style={{ height: '72px' }}>
      {/* Left: Book Now */}
      <div className="relative flex items-center" ref={bookMenuRef}>
        <div
          className="hidden md:flex items-center"
        >
          <button
            type="button"
            onClick={handleBookToggle}
            onBlur={(event) => {
              if (
                bookMenuRef.current &&
                !bookMenuRef.current.contains(event.relatedTarget as Node)
              ) {
                handleBookClose();
              }
            }}
            aria-haspopup="true"
            aria-expanded={bookMenuOpen}
            className="group inline-flex items-center gap-3 border border-white/40 bg-white/5 px-6 py-3 uppercase tracking-[0.3em] text-xs font-roboto text-white transition-all duration-500 hover:border-[#BA8424] hover:bg-[#BA8424]/90 hover:shadow-[0_18px_35px_rgba(186,132,36,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BA8424]"
          >
            Book Now
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              aria-hidden="true"
              className={`transition-transform duration-500 ${bookMenuOpen ? "translate-y-0 rotate-180" : "translate-y-[1px]"}`}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/80"
              />
            </svg>
          </button>
          <div
            className={`absolute left-0 top-full mt-3 w-[min(18rem,calc(100vw-3rem))] overflow-hidden border border-white/10 bg-gradient-to-br from-[#15261E]/95 via-[#1D3428]/90 to-[#0B1611]/95 p-[1px] backdrop-blur-md transition-all duration-300 ${
              bookMenuOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"
            }`}
          >
            <div className="relative  bg-[#0F1A15]/90 p-4 ">
              {bookLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBookClose}
                  className="group flex flex-col gap-1 border border-transparent px-4 py-3 transition-all duration-300 hover:border-[#BA8424]/60 hover:bg-[#BA8424]/15"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white group-hover:text-[#F0D0A2]">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={handleBookToggle}
            aria-haspopup="true"
            aria-expanded={bookMenuOpen}
            className="flex items-center gap-1 border border-white px-3 py-2 text-[0.79rem] tracking-[0.1em] font-rhiffiral font-bold uppercase text-white transition-all duration-300 hover:bg-[#F5F1E9] active:scale-[0.98]"
          >
            Book Now
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              aria-hidden="true"
              className={`transition-transform duration-500 ${bookMenuOpen ? "translate-y-0 rotate-180" : "translate-y-[1px]"}`}
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              />
            </svg>
          </button>
          {bookMenuOpen && (
            <>
              <button
                type="button"
                aria-hidden="true"
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300"
                onClick={handleBookClose}
              />
              <div
                className={`fixed inset-x-4 top-[calc(72px+1rem)] z-50 origin-top rounded-3xl border border-white/10 bg-gradient-to-br from-[#11251C]/95 via-[#132D21]/90 to-[#0B1812]/95 p-[1px] shadow-[0_26px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
                  bookMenuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
              >
                <div className="rounded-[2rem] bg-[#0F1A15]/95 p-4">
                  
                  <div className="flex flex-col gap-3">
                    {bookLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleBookClose}
                        className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-left transition-all duration-200 hover:border-[#BA8424]/60 hover:bg-[#BA8424]/20 hover:shadow-[0_20px_35px_rgba(0,0,0,0.4)]"
                      >
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white group-hover:text-[#F4D8AF]">
                          {link.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Center: Logo absolutely centered using relative wrapper */}
      <div className="absolute pt-52 pl-3 lg:pl-0 lg:pt-16 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <Link href="/" onClick={handleLogoClick} className="flex items-center justify-center">
          <Image
            src="/assets/ysabel-logo-white.png"
            alt="Ysabel Logo"
            width={180}
            height={60}
            className="object-contain select-none"
            priority={true}
          />
        </Link>
      </div>
      {/* Right: Food Menu button and Hamburger */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          className="z-40 relative flex items-center justify-center w-12 h-12 group focus:outline-none"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={handleToggle}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" className="transition-transform duration-500 ease-in-out cursor-pointer" style={{stroke: 'white', strokeWidth:1.9, strokeLinecap:'round'}}>
            <line x1="6" y1="10" x2="30" y2="10" className={`transition-all duration-500 origin-center ${open && !isClosing ? 'translate-y-[8px] rotate-45' : ''}`} />
            <line x1="6" y1="18" x2="30" y2="18" className={`transition-all duration-400 origin-center ${open && !isClosing ? 'opacity-0' : 'opacity-100'}`} />
            <line x1="6" y1="26" x2="30" y2="26" className={`transition-all duration-500 origin-center ${open && !isClosing ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </svg>
        </button>
      </div>

      {/* Fullscreen overlay menu with enter/exit animations */}
      {isOverlayVisible && (
        <div className={`${overlayClass} fixed inset-0 w-full h-full z-40 flex flex-col justify-center items-center`} >
          <button className="absolute top-10 right-10 z-50" aria-label="Close menu" onClick={handleClose}>
            <svg width="36" height="36" viewBox="0 0 36 36" className="cursor-pointer" style={{stroke: 'white', strokeWidth:3, strokeLinecap:'round'}}>
              <line x1="6" y1="3" x2="30" y2="5" className={`transition-all duration-500 origin-center ${open && !isClosing ? 'translate-y-[8px] rotate-45' : ''}`} />
              <line x1="9" y1="26" x2="33" y2="26" className={`transition-all duration-500 origin-center ${open && !isClosing ? '-translate-y-[8px] -rotate-45' : ''}`} />
            </svg>
          </button>
          <nav className="flex flex-col gap-10 items-center mt-8">
            {menuItems.map((item, i) => {
              if (item.label === "RESERVATION") {
                return (
                  <div
                    key={item.label}
                    className="relative flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setOverlayBookOpen((prev) => !prev)}
                      aria-haspopup="true"
                      aria-expanded={overlayBookOpen}
                      className="menu-link-special text-[#BDBDB9] font-rhiffiral text-3xl md:text-6xl tracking-widest transition-all flex items-center gap-4"
                    >
                      <span className="reveal-wrap">
                        <span
                          className="menu-link-lineup"
                          style={{ animationDelay: `${0.5 + i * 0.25}s` }}
                        >
                          {item.label}
                        </span>
                      </span>
                      <svg
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        aria-hidden="true"
                        className={`transition-transform duration-500 ${overlayBookOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M2 2L9 9L16 2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div
                      className={`mt-5 origin-top transform transition-all duration-300 ${
                        overlayBookOpen
                          ? "pointer-events-auto scale-100 opacity-100"
                          : "pointer-events-none scale-95 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.05] px-6 py-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                        <span className="uppercase tracking-[0.4em] text-xs text-[#F5F1E9]/80 font-roboto">
                          Book Now
                        </span>
                        {bookLinks.map((link) => (
                          <a
                            key={link.title}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleClose}
                            className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-transparent bg-white/[0.04] px-6 py-3 text-sm uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-[#BA8424]/60 hover:bg-[#BA8424]/20 hover:text-[#F4D8AF]"
                          >
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  href={item.href}
                  key={item.label}
                  className="menu-link-special text-[#BDBDB9] font-rhiffiral text-3xl md:text-6xl tracking-widest transition-all"
                  onClick={handleClose}
                >
                  <span className="reveal-wrap">
                    <span className="menu-link-lineup" style={{ animationDelay: `${0.5 + i * 0.25}s` }}>
                      {item.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>
          <div className="mt-12 flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/ysabelsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/ysabelsociety"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
          </div>
          {/* Logo bottom center */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <Image
              src="/assets/ysabel-text.png"
              alt="Ysabel Logo Overlay"
              width={100}
              height={40}
              className="object-contain select-none opacity-60"
              priority={false}
            />          
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
