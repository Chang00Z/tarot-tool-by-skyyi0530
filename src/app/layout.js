import "./globals.css";

export const metadata = {
  title: "塔羅抽牌工具",
  description: "塔羅抽牌工具",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
