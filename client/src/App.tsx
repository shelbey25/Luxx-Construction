import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { ReviewsCarousel } from "./components/ReviewsCarousel";
import { LeaveReview } from "./components/LeaveReview";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900 text-bone-100">
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <ReviewsCarousel />
        <LeaveReview />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
