import backpackboyz from "@/assets/brands/backpackboyz-new.png";
import superCandyBros from "@/assets/brands/super-candy-bros-new.png";
import alwaysFaded from "@/assets/brands/always-faded.png";
import kushFactory from "@/assets/brands/kush-factory.png";
import highTolerance from "@/assets/brands/high-tolerance.png";
import zourZop from "@/assets/brands/zour-zop.png";
import frutaz from "@/assets/brands/frutaz.png";
import donMerfos from "@/assets/brands/don-merfos.png";
import fumi from "@/assets/brands/fumi.png";
import caliCloudsClub from "@/assets/brands/cali-clouds-club.png";
import cupsStrainz from "@/assets/brands/cups-strainz.png";
import julatoNyc from "@/assets/brands/julato-nyc.png";

const brands = [
  { src: backpackboyz, alt: "BackPackBoyz" },
  { src: superCandyBros, alt: "Super Candy Bros" },
  { src: alwaysFaded, alt: "Always Faded" },
  { src: kushFactory, alt: "Kush Factory" },
  { src: highTolerance, alt: "High Tolerance" },
  { src: zourZop, alt: "Zour Zop" },
  { src: frutaz, alt: "Frutaz" },
  { src: donMerfos, alt: "Don Merfos" },
  { src: fumi, alt: "Fumi" },
  { src: caliCloudsClub, alt: "Cali Clouds Club" },
  { src: cupsStrainz, alt: "Cups Strainz" },
  { src: julatoNyc, alt: "Julato NYC" },
];

const BrandCarousel = () => (
  <section className="relative bg-white py-[60px] overflow-hidden">
    {/* Gold divider line */}
    <div className="flex justify-center mb-6">
      <div style={{ width: 100, height: 1, backgroundColor: "rgba(197, 163, 85, 0.3)" }} />
    </div>

    {/* Heading */}
    <p
      className="text-center font-sans font-medium mb-8 sm:mb-10"
      style={{
        fontSize: 14,
        letterSpacing: "0.3em",
        color: "#1a1a1a",
        fontFamily: "'Montserrat', sans-serif",
        textTransform: "uppercase",
      }}
    >
      Our Brands
    </p>

    {/* Marquee container */}
    <div className="relative group">
      <div
        className="flex items-center scrollbar-hide"
        style={{
          width: "max-content",
          gap: 40,
          animation: "marquee-scroll 30s linear infinite",
          animationPlayState: "running",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
        onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
      >
        {[...brands, ...brands].map((b, i) => (
          <div key={i} className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <img
              src={b.src}
              alt={b.alt}
              className="object-contain"
              style={{ height: 60, width: "auto", maxWidth: 140 }}
              loading="lazy"
              width="140"
              height="60"
            />
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "linear-gradient(90deg, #FFFFFF 0%, transparent 100%)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" style={{ background: "linear-gradient(270deg, #FFFFFF 0%, transparent 100%)" }} />
    </div>

    <style>{`
      @keyframes marquee-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
);

export default BrandCarousel;
