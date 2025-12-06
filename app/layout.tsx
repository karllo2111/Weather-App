import "../globals.css";

export const metadata = {
  title: "Weather App",
  description: "Weather app Indonesia menggunakan Open-Meteo API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
