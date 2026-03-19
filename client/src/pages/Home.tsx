import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Utensils, Heart, Users, Mail, Phone, MapPin, Menu, X, Star, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386607820/QjYBc4dVKTa2C8xKYrF7gq/logo-transparent_6c7ecaff.png";
const HERO_IMAGE = "/catering-images/food1.jpg";
const GALLERY_IMAGES = [
  "/catering-images/food1.jpg",
  "/catering-images/food2.jpg",
  "/catering-images/food3.jpg",
  "/catering-images/food4.jpg",
];

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Offerings", href: "#offerings" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book Now", href: "#contact" },
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceType: "inquiry",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/trpc/contact.submit?batch=1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          0: {
            json: formData,
          },
        }),
      });

      if (response.ok) {
        toast.success("Thank you for your inquiry. We will contact you shortly to discuss your exquisite experience.");
        setFormData({ name: "", email: "", phone: "", message: "", serviceType: "inquiry" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c2c2c] font-sans">
      {/* Elegant Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gold/10 px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={LOGO_URL} alt="She Is Exquisite Meals" className="h-10 md:h-14 w-auto" />
        </div>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] hover:text-primary transition-colors duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xl uppercase tracking-widest hover:text-primary transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section - Exquisite & Impactful */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-subtle-zoom"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="mb-6 flex justify-center">
            <div className="h-[1px] w-12 bg-white/60 self-center"></div>
            <span className="mx-4 text-xs uppercase tracking-[0.4em] font-light">Fine Dining & Catering</span>
            <div className="h-[1px] w-12 bg-white/60 self-center"></div>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-light mb-8 leading-tight italic drop-shadow-2xl">
            She Is Exquisite
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light tracking-wide max-w-2xl mx-auto drop-shadow-lg">
            A culinary journey crafted with passion, elegance, and the finest ingredients.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-10 py-7 rounded-none text-sm uppercase tracking-widest transition-all duration-500 border border-white">
              <a href="#contact">Book An Experience</a>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black px-10 py-7 rounded-none text-sm uppercase tracking-widest transition-all duration-500">
              <a href="#offerings">View Offerings</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience / Services Section */}
      <section id="experience" className="py-24 md:py-32 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl italic mb-6">The Exquisite Experience</h2>
            <div className="w-20 h-[1px] bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              We specialize in transforming fresh, premium ingredients into unforgettable culinary masterpieces, 
              tailored for those who appreciate the finer things in life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="mb-8 relative inline-block">
                <div className="absolute -inset-4 border border-primary/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <Utensils className="w-10 h-10 text-primary relative z-10" />
              </div>
              <h3 className="font-serif text-2xl mb-4 italic">Gourmet Meal Prep</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Elevate your daily dining with chef-curated meals. Prepared fresh, balanced, and delivered with sophistication.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8 relative inline-block">
                <div className="absolute -inset-4 border border-primary/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <Users className="w-10 h-10 text-primary relative z-10" />
              </div>
              <h3 className="font-serif text-2xl mb-4 italic">Bespoke Catering</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                From intimate soirées to grand celebrations, we provide a full-service catering experience that leaves a lasting impression.
              </p>
            </div>

            <div className="text-center group">
              <div className="mb-8 relative inline-block">
                <div className="absolute -inset-4 border border-primary/20 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                <Heart className="w-10 h-10 text-primary relative z-10" />
              </div>
              <h3 className="font-serif text-2xl mb-4 italic">Private Chef Dining</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Bring the luxury of a fine-dining restaurant to your home. Personalized menus crafted for your most cherished moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section id="offerings" className="py-24 md:py-32 bg-[#1a1a1a] text-white">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary uppercase tracking-[0.3em] text-xs mb-4 block">Our Curation</span>
              <h2 className="font-serif text-4xl md:text-5xl italic mb-8">Culinary Offerings</h2>
              <p className="text-gray-400 font-light text-lg mb-12 leading-relaxed">
                Each dish is a testament to our commitment to quality. We use no MSG and no added salt, 
                allowing the natural, exquisite flavors of our premium ingredients to shine through.
              </p>
              
              <div className="space-y-10">
                {[
                  { name: "Signature Meal Prep Boxes", price: "From $65", desc: "A week of gourmet nourishment, meticulously portioned." },
                  { name: "Elite Event Catering", price: "Inquire for Quote", desc: "Customized menus designed for your specific occasion." },
                  { name: "Chef's Tasting Experience", price: "Custom", desc: "A multi-course journey through our finest seasonal creations." },
                ].map((item, idx) => (
                  <div key={idx} className="border-b border-white/10 pb-6 group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-serif text-xl group-hover:text-primary transition-colors">{item.name}</h4>
                      <span className="text-sm font-light tracking-widest text-primary">{item.price}</span>
                    </div>
                    <p className="text-gray-500 font-light text-sm italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden border border-white/10">
                <img 
                  src="/catering-images/food2.jpg" 
                  alt="Gourmet Preparation" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 border border-primary/30 -z-10 hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 px-6 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl italic mb-6">Visual Feast</h2>
            <p className="text-muted-foreground font-light tracking-widest uppercase text-xs">A glimpse into the exquisite</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((image, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Exquisite Creation ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-[0.3em] border border-white/40 px-4 py-2">View Detail</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-primary transition">
              <X size={32} />
            </button>
            <div className="max-w-5xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <img src={selectedImage} alt="Exquisite Gallery" className="max-w-full max-h-full object-contain shadow-2xl" />
            </div>
          </div>
        )}
      </section>

      {/* Contact / Booking Section */}
      <section id="contact" className="py-24 md:py-32 bg-[#faf9f6]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-[#1a1a1a] text-white p-12 md:p-16 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-4xl italic mb-8">Reserve Your Date</h2>
                <p className="text-gray-400 font-light mb-12">
                  Allow us to curate a bespoke culinary experience for you. Please provide your details and we will contact you for a consultation.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group">
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <Phone size={16} className="text-primary group-hover:text-white" />
                    </div>
                    <span className="text-sm font-light tracking-widest">(248) 301-9668</span>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <Mail size={16} className="text-primary group-hover:text-white" />
                    </div>
                    <span className="text-sm font-light tracking-widest">exquisitemeals@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <MapPin size={16} className="text-primary group-hover:text-white" />
                    </div>
                    <span className="text-sm font-light tracking-widest">Michigan & Surrounding Areas</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">Excellence is in the details.</p>
              </div>
            </div>

            <div className="md:w-2/3 p-12 md:p-16">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Email Address</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(000) 000-0000"
                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Service Interest</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full border-0 border-b border-gray-200 rounded-none px-0 py-2 focus:outline-none focus:border-primary transition-all bg-transparent text-sm"
                  >
                    <option value="inquiry">General Inquiry</option>
                    <option value="meal-prep">Gourmet Meal Prep</option>
                    <option value="catering">Bespoke Catering</option>
                    <option value="private-chef">Private Chef Dining</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-semibold text-gray-400">Your Vision</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event or meal prep needs..."
                    rows={4}
                    className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent resize-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a1a1a] hover:bg-primary text-white py-8 rounded-none text-xs uppercase tracking-[0.3em] transition-all duration-500"
                  >
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-gray-100">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <img src={LOGO_URL} alt="Logo" className="h-16 mx-auto mb-10 opacity-80" />
          <div className="flex justify-center gap-12 mb-12">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="text-[10px] uppercase tracking-[0.2em] font-medium hover:text-primary transition">
                {link.label}
              </a>
            ))}
          </div>
          <div className="w-12 h-[1px] bg-primary/30 mx-auto mb-10"></div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2">
            &copy; 2026 She Is Exquisite Meals
          </p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary">
            Crafted with Love. Prepared with Perfection.
          </p>
        </div>
      </footer>
      
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
