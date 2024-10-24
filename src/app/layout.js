// src/app/layout.js
import "./globals.css"; // Import global styles

export const metadata = {
  title: "QR Code Scanner",
  description: "A simple QR code scanner application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
