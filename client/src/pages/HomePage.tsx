import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { ReviewsCarousel } from "../components/ReviewsCarousel";
import { LeaveReview } from "../components/LeaveReview";
import { ContactForm } from "../components/ContactForm";

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <ReviewsCarousel />
      <LeaveReview />
      <ContactForm />
    </>
  );
}
