export const metadata = {
  title: "Project Ocean — Humanity’s next wave of intelligence",
  description: "Emotionally-aware AI. Privacy-first. Memory under your control.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}

