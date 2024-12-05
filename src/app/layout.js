import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthWrapper from "./Home/AuthWrapper ";

export const metadata = {
  title: "vizitsure",
  description: "vizitsure",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <AuthWrapper>
          <main>{children}</main>
        </AuthWrapper>
        <Footer />
      </body>
    </html>
  );
}
