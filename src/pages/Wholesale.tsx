import { useState, useRef, DragEvent } from "react";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  label: string;
  file: File | null;
  onFile: (f: File | null) => void;
}

const FileUpload = ({ label, file, onFile }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div>
      <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(e) => onFile(e.target.files?.[0] || null)}
        />
        {file ? (
          <p className="text-sm text-foreground">{file.name}</p>
        ) : (
          <p className="text-sm text-muted-foreground">Drag & Drop or Click here to upload</p>
        )}
      </div>
    </div>
  );
};

const Wholesale = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    website: "",
    licenseNumber: "",
  });
  const [w9, setW9] = useState<File | null>(null);
  const [stateLicense, setStateLicense] = useState<File | null>(null);
  const [sellersPermit, setSellersPermit] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const uploadFile = async (file: File | null, prefix: string) => {
    if (!file) return null;
    const ext = file.name.split(".").pop();
    const path = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("wholesale-docs").upload(path, file);
    if (error) throw error;
    return path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.companyName || !form.companyAddress || !form.licenseNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const [w9Url, licenseUrl, permitUrl] = await Promise.all([
        uploadFile(w9, "w9"),
        uploadFile(stateLicense, "state-license"),
        uploadFile(sellersPermit, "sellers-permit"),
      ]);

      const { error } = await supabase.from("wholesale_inquiries").insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company_name: form.companyName,
        company_address: form.companyAddress,
        website: form.website || null,
        license_number: form.licenseNumber,
        w9_url: w9Url,
        state_license_url: licenseUrl,
        sellers_permit_url: permitUrl,
      });

      if (error) throw error;

      toast.success("Wholesale inquiry submitted! We'll be in touch.");
      setForm({ name: "", email: "", phone: "", companyName: "", companyAddress: "", website: "", licenseNumber: "" });
      setW9(null);
      setStateLicense(null);
      setSellersPermit(null);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-muted border border-border rounded-xl px-4 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all";

  return (
    <PageLayout>
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <h1 className="font-serif text-3xl sm:text-5xl text-foreground mb-3">Wholesale</h1>
        <p className="text-muted-foreground mb-12 max-w-xl">
          Interested in carrying our products? Fill out the form below and our team will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input className={inputClass} placeholder="Full Name *" value={form.name} onChange={update("name")} />
            <input className={inputClass} placeholder="Email *" type="email" value={form.email} onChange={update("email")} />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input className={inputClass} placeholder="Phone Number *" value={form.phone} onChange={update("phone")} />
            <input className={inputClass} placeholder="Company Name *" value={form.companyName} onChange={update("companyName")} />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input className={inputClass} placeholder="Company Address *" value={form.companyAddress} onChange={update("companyAddress")} />
            <input className={inputClass} placeholder="Website" value={form.website} onChange={update("website")} />
          </div>

          {/* Row 4 */}
          <input className={inputClass} placeholder="License # *" value={form.licenseNumber} onChange={update("licenseNumber")} />

          {/* File uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FileUpload label="Complete & Upload W-9" file={w9} onFile={setW9} />
            <FileUpload label="Attach Your State License" file={stateLicense} onFile={setStateLicense} />
          </div>
          <FileUpload label="Attach Your Sellers Permit" file={sellersPermit} onFile={setSellersPermit} />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-foreground text-background font-semibold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Send Message"}
          </button>
        </form>
      </section>
    </PageLayout>
  );
};

export default Wholesale;
