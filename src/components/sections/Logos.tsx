import React from "react";

const logos = [
  { name: "Acme", letter: "A" },
  { name: "Nimbus", letter: "N" },
  { name: "ZenPay", letter: "Z" },
  { name: "SkyNet", letter: "S" },
  { name: "Quantum", letter: "Q" },
  { name: "Hexa", letter: "H" },
];

const Logos: React.FC = () => {
  return (
    <section className="py-12 bg-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
          {logos.map((l, i) => (
            <div key={i} className="bg-white border border-emerald-200 rounded-lg h-16 flex items-center justify-center text-emerald-700 font-semibold hover:shadow-md transition-all anim-scale-in" style={{ animationDelay: `${i * 80}ms` }}>
              {l.letter}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;


