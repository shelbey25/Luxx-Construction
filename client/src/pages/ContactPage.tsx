import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/ContactForm";

export function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Get in Touch"
        title="Ready to"
        italic="get started?"
        description="Complete the form and a member of our team will reach out at their earliest convenience. Homeowners, businesses and professionals across almost every industry trust LUXX."
        image="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Contact LUXX"
      />
      <ContactForm />
    </>
  );
}
