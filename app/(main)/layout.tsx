import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ChatAssistant from "@/components/ai/ChatAssistant";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatAssistant />
    </>
  );
}
