import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, Leaf, Heart, Users, Mail, Phone, MapPin } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663386607820/QjYBc4dVKTa2C8xKYrF7gq/hero-food-1_fbbf3fc2.jpg";
const GALLERY_IMAGES = [
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386607820/QjYBc4dVKTa2C8xKYrF7gq/gallery-1_024169cd.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386607820/QjYBc4dVKTa2C8xKYrF7gq/gallery-2_bde4e630.jpg",
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663386607820/QjYBc4dVKTa2C8xKYrF7gq/gallery-3_defb67af.jpg",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call the backend to send email notification
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
        toast.success("Thank you! We'll be in touch soon.");
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ChefHat className="w-8 h-8 text-primary" />
            <span className="font-serif text-xl font-bold text-primary">She Is Exquisite</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition">Services</a>
            <a href="#menu" className="text-foreground hover:text-primary transition">Menu</a>
            <a href="#about" className="text-foreground hover:text-primary transition">About</a>
            <a href="#gallery" className="text-foreground hover:text-primary transition">Gallery</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">She Is Exquisite Meals</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">Crafted with Love, Prepared with Perfection</p>
          <p className="text-lg md:text-xl mb-8 opacity-90">Premium meal prep, catering, and intimate family dining experiences</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            Book Your Meal
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white">
        <div className="container">
          <div className="section-title">
            <h2 className="brand-heading text-primary mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a variety of services tailored to your needs, all prepared with the highest quality ingredients and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Meal Prep */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <Leaf className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="font-serif text-2xl">Meal Prep</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Healthy, delicious meals prepared fresh and ready for your week. No MSG, no salt—just pure, quality ingredients.
                </p>
              </CardContent>
            </Card>

            {/* Catering */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="font-serif text-2xl">Catering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional catering for events of any size. From intimate gatherings to large celebrations, we handle it all.
                </p>
              </CardContent>
            </Card>

            {/* Family Meals */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="font-serif text-2xl">Family Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Intimate family dining experiences with home-style cooking that brings people together around the table.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding bg-slate-50">
        <div className="container">
          <div className="section-title">
            <h2 className="brand-heading text-primary mb-4">Our Offerings</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated menu of fresh, flavorful options.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Classic Meal Prep Boxes", price: "$45-65", desc: "5-7 fresh meals with protein, vegetables, and grains" },
              { name: "Premium Catering Packages", price: "$25-40/person", desc: "Full-service catering for events and gatherings" },
              { name: "Chef's Special Menu", price: "Custom", desc: "Personalized menus tailored to your preferences" },
              { name: "Family Dinner Packages", price: "$80-150", desc: "Complete meals for 4-6 people, ready to enjoy" },
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{item.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold text-lg">{item.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="brand-heading text-primary mb-8 text-center">About Us</h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At She Is Exquisite Meals, we believe that exceptional food is more than just sustenance—it's an expression of care, quality, and passion. Every dish we prepare carries the commitment to excellence that defines our brand.
              </p>

              <div className="bg-slate-50 p-8 rounded-lg border-l-4 border-primary">
                <h3 className="font-serif text-2xl text-primary mb-4">Our Quality Commitment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>No MSG</strong> — We never use monosodium glutamate in any of our meals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>No Added Salt</strong> — We let the natural flavors of quality ingredients shine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Fresh Ingredients</strong> — We source the finest, freshest ingredients available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span><strong>Prepared Fresh</strong> — Every meal is prepared to order with meticulous attention to detail</span>
                  </li>
                </ul>
              </div>

              <p>
                Our approach to cooking is rooted in the tradition of home-style preparation—where every ingredient matters and every dish is crafted with intention. We believe that when you prepare food with care and use only the best ingredients, the results speak for themselves.
              </p>

              <p>
                Whether you're looking for convenient meal prep, professional catering, or intimate family dining, we're here to deliver an exquisite experience that exceeds your expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-slate-50">
        <div className="container">
          <div className="section-title">
            <h2 className="brand-heading text-primary mb-4">Our Work</h2>
            <p className="text-lg text-muted-foreground">A glimpse into the culinary creations we prepare daily</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {GALLERY_IMAGES.map((image, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer group h-64"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <img src={selectedImage} alt="Gallery" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="section-title">
              <h2 className="brand-heading text-primary mb-4">Get In Touch</h2>
              <p className="text-lg text-muted-foreground">
                Ready to experience exquisite meals? Contact us to book your service or ask any questions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">(248) 301-9668</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">exquisitemeals@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Service Area</h3>
                    <p className="text-muted-foreground">Michigan and surrounding areas</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9am - 6pm</p>
                  <p className="text-muted-foreground">Saturday: 10am - 4pm</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Service Type</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="inquiry">General Inquiry</option>
                    <option value="meal-prep">Meal Prep</option>
                    <option value="catering">Catering</option>
                    <option value="family-meals">Family Meals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your needs..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="container text-center">
          <p className="mb-2">&copy; 2026 She Is Exquisite Meals. All rights reserved.</p>
          <p className="text-sm opacity-90">Crafted with love, prepared with perfection.</p>
        </div>
      </footer>
    </div>
  );
}
