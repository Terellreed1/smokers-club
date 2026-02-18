import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, HelpCircle, Star, BarChart3, LogOut,
  Plus, Pencil, Trash2, X, ChevronDown, RefreshCw,
  ExternalLink, Image as ImageIcon,
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import logoImg from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

// ─── Types ───────────────────────────────────────────────────────
interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  qty: number;
  image_url: string | null;
  description: string;
  is_new: boolean;
  strain: string | null;
  product_type: string;
  active: boolean;
  sort_order: number;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
}

interface Review {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  product_id: string | null;
  show_on_homepage: boolean;
  active: boolean;
  products?: { name: string } | null;
}

const STRAIN_OPTIONS = ["None", "Indica", "Sativa", "Hybrid"];
const TYPE_OPTIONS = ["Flower", "Vapes", "Edibles", "Concentrates", "Pre-Rolls", "Accessories", "Other"];
const PRICE_PRESETS = ["$50", "$55", "$60", "$65", "$70", "$75", "$80"];

// ─── Sidebar Nav ─────────────────────────────────────────────────
const navItems = [
  { id: "products", label: "Products", icon: Package },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

// ─── Helpers ─────────────────────────────────────────────────────
const StarRating = ({ rating, onChange }: { rating: number; onChange?: (r: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        onClick={() => onChange?.(s)}
        className={`text-lg leading-none transition-colors ${s <= rating ? "text-yellow-400" : "text-black/15"} ${onChange ? "cursor-pointer hover:text-yellow-300" : "cursor-default"}`}
      >
        ★
      </button>
    ))}
  </div>
);

// ─── Modal wrapper ────────────────────────────────────────────────
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white border border-black/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
    >
      <div className="flex items-center justify-between p-6 border-b border-black/8">
        <h3 className="text-foreground font-semibold">{title}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={18} />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  </motion.div>
);

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <label className="block text-black/40 text-xs uppercase tracking-wider mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-black/30 text-[10px] mt-1">{hint}</p>}
  </div>
);

const inputCls = "w-full bg-transparent border border-black/15 text-foreground placeholder-black/25 px-3 py-2.5 text-sm rounded-lg focus:outline-none focus:border-black/40 transition-colors";
const selectCls = inputCls + " appearance-none";

// ─── Products Section ─────────────────────────────────────────────
const ProductsSection = ({ callAdmin }: { callAdmin: (r: string, m: "GET" | "POST" | "PUT" | "DELETE", b?: object) => Promise<unknown> }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", brand: "", price: "$65", qty: 0, image_url: "", description: "", strain: "None", product_type: "Flower", is_new: false, active: true });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setProducts((await callAdmin("products", "GET")) as Product[]); } catch {}
    setLoading(false);
  }, [callAdmin]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setForm({ name: "", brand: "", price: "$65", qty: 0, image_url: "", description: "", strain: "None", product_type: "Flower", is_new: false, active: true });
    setModal("add");
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, brand: p.brand, price: p.price, qty: p.qty, image_url: p.image_url || "", description: p.description, strain: p.strain || "None", product_type: p.product_type, is_new: p.is_new, active: p.active });
    setModal("edit");
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, image_url: form.image_url || null, strain: form.strain === "None" ? null : form.strain };
      if (modal === "add") await callAdmin("products", "POST", payload);
      else await callAdmin("products", "PUT", { id: editing!.id, ...payload });
      await load();
      setModal(null);
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    try { await callAdmin("products", "DELETE", { id }); await load(); } catch (e) { alert("Delete failed: " + e); }
    setDeleteId(null);
  };

  const f = (k: string, v: string | number | boolean) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-foreground text-xl font-semibold">Products</h2>
          <p className="text-muted-foreground text-xs mt-0.5">{products.length} items in catalog</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 rounded-lg transition-all">
            <RefreshCw size={14} />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-80 transition-opacity">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-muted-foreground text-sm text-center py-16">Loading…</div>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <motion.div
              key={p.id}
              layout
              className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${p.active ? "border-black/8 hover:bg-black/2" : "border-black/5 opacity-40"}`}
            >
              <div className="w-12 h-12 rounded-lg bg-black/5 border border-black/8 overflow-hidden flex-shrink-0">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-black/20"><ImageIcon size={16} /></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-foreground text-sm font-medium truncate">{p.name}</p>
                  {p.is_new && <span className="text-[9px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>}
                  {!p.active && <span className="text-[9px] bg-black/8 text-muted-foreground px-1.5 py-0.5 rounded uppercase tracking-wider">Hidden</span>}
                </div>
                <p className="text-muted-foreground text-xs mt-0.5">{p.brand} · {p.product_type} {p.strain ? `· ${p.strain}` : ""}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-foreground text-sm font-medium">{p.price}</p>
                <p className="text-muted-foreground text-xs">qty: {p.qty}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(p)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/5 transition-all">
                  <Pencil size={13} />
                </button>
                <button onClick={() => setDeleteId(p.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-50 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Product" : "Edit Product"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name">
                  <input className={inputCls} value={form.name} onChange={(e) => f("name", e.target.value)} placeholder="Product name" />
                </Field>
                <Field label="Brand">
                  <input className={inputCls} value={form.brand} onChange={(e) => f("brand", e.target.value)} placeholder="Brand name" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price">
                  <div className="relative">
                    <select className={selectCls} value={form.price} onChange={(e) => f("price", e.target.value)}>
                      {PRICE_PRESETS.map((pr) => <option key={pr}>{pr}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
                <Field label="Quantity">
                  <input type="number" className={inputCls} value={form.qty} onChange={(e) => f("qty", parseInt(e.target.value) || 0)} min={0} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Strain">
                  <div className="relative">
                    <select className={selectCls} value={form.strain} onChange={(e) => f("strain", e.target.value)}>
                      {STRAIN_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
                <Field label="Product Type">
                  <div className="relative">
                    <select className={selectCls} value={form.product_type} onChange={(e) => f("product_type", e.target.value)}>
                      {TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </Field>
              </div>
              <Field
                label="Image URL (imgbb)"
                hint="Upload your image to imgbb.com → copy the Direct Link → paste it here"
              >
                <div className="space-y-2">
                  <input
                    className={inputCls}
                    value={form.image_url}
                    onChange={(e) => f("image_url", e.target.value)}
                    placeholder="https://i.ibb.co/..."
                  />
                  <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink size={10} /> Open imgbb.com to upload &amp; get link
                  </a>
                  {form.image_url && (
                    <img src={form.image_url} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-black/10 mt-1" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                </div>
              </Field>
              <Field label="Description">
                <textarea
                  className={inputCls + " min-h-[80px] resize-none"}
                  value={form.description}
                  onChange={(e) => f("description", e.target.value)}
                  placeholder="Product description…"
                />
              </Field>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_new} onChange={(e) => f("is_new", e.target.checked)} className="sr-only" />
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${form.is_new ? "bg-emerald-500" : "bg-black/15"}`}>
                    <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ transform: form.is_new ? "translateX(1.25rem)" : "translateX(0.125rem)" }} />
                  </div>
                  <span className="text-muted-foreground text-xs">Mark as New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={(e) => f("active", e.target.checked)} className="sr-only" />
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${form.active ? "bg-emerald-500" : "bg-black/15"}`}>
                    <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ transform: form.active ? "translateX(1.25rem)" : "translateX(0.125rem)" }} />
                  </div>
                  <span className="text-muted-foreground text-xs">Active / Visible</span>
                </label>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg hover:border-foreground/30 transition-colors">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 py-2.5 text-sm bg-foreground text-background font-semibold rounded-lg hover:opacity-80 disabled:opacity-40 transition-all">
                  {saving ? "Saving…" : "Save Product"}
                </button>
              </div>
            </div>
          </Modal>
        )}
        {deleteId && (
          <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
            <p className="text-muted-foreground text-sm mb-6">This will permanently remove the product. This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg">Cancel</button>
              <button onClick={() => remove(deleteId)} className="flex-1 py-2.5 text-sm bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── FAQ Section ──────────────────────────────────────────────────
const FaqSection = ({ callAdmin }: { callAdmin: (r: string, m: "GET" | "POST" | "PUT" | "DELETE", b?: object) => Promise<unknown> }) => {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<FaqItem | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", active: true });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems((await callAdmin("faq", "GET")) as FaqItem[]); } catch {}
    setLoading(false);
  }, [callAdmin]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm({ question: "", answer: "", active: true }); setModal("add"); };
  const openEdit = (item: FaqItem) => { setEditing(item); setForm({ question: item.question, answer: item.answer, active: item.active }); setModal("edit"); };

  const save = async () => {
    setSaving(true);
    try {
      if (modal === "add") await callAdmin("faq", "POST", form);
      else await callAdmin("faq", "PUT", { id: editing!.id, ...form });
      await load(); setModal(null);
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    try { await callAdmin("faq", "DELETE", { id }); await load(); } catch (e) { alert("Delete failed: " + e); }
    setDeleteId(null);
  };

  const f = (k: string, v: string | boolean) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-foreground text-xl font-semibold">FAQ</h2>
          <p className="text-muted-foreground text-xs mt-0.5">{items.length} questions</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 rounded-lg transition-all"><RefreshCw size={14} /></button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-80 transition-opacity">
            <Plus size={14} /> Add Question
          </button>
        </div>
      </div>

      {loading ? <div className="text-muted-foreground text-sm text-center py-16">Loading…</div> : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className={`p-4 rounded-xl border flex gap-4 transition-colors ${item.active ? "border-black/8 hover:bg-black/2" : "border-black/5 opacity-40"}`}>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">{item.question}</p>
                <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{item.answer}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(item)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/5 transition-all"><Pencil size={13} /></button>
                <button onClick={() => setDeleteId(item.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Question" : "Edit Question"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <Field label="Question">
                <input className={inputCls} value={form.question} onChange={(e) => f("question", e.target.value)} placeholder="What do customers ask?" />
              </Field>
              <Field label="Answer">
                <textarea className={inputCls + " min-h-[100px] resize-none"} value={form.answer} onChange={(e) => f("answer", e.target.value)} placeholder="Your answer…" />
              </Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => f("active", e.target.checked)} className="sr-only" />
                <div className={`w-8 h-4 rounded-full transition-colors relative ${form.active ? "bg-emerald-500" : "bg-black/15"}`}>
                  <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ transform: form.active ? "translateX(1.25rem)" : "translateX(0.125rem)" }} />
                </div>
                <span className="text-muted-foreground text-xs">Visible on FAQ page</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 py-2.5 text-sm bg-foreground text-background font-semibold rounded-lg disabled:opacity-40">
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </Modal>
        )}
        {deleteId && (
          <Modal title="Delete FAQ" onClose={() => setDeleteId(null)}>
            <p className="text-muted-foreground text-sm mb-6">Remove this question permanently?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg">Cancel</button>
              <button onClick={() => remove(deleteId)} className="flex-1 py-2.5 text-sm bg-red-500 text-white font-semibold rounded-lg">Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Reviews Section ──────────────────────────────────────────────
const ReviewsSection = ({ callAdmin }: { callAdmin: (r: string, m: "GET" | "POST" | "PUT" | "DELETE", b?: object) => Promise<unknown> }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Review | null>(null);
  const [form, setForm] = useState({ author_name: "", rating: 5, body: "", show_on_homepage: true, active: true });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const all = (await callAdmin("reviews", "GET")) as Review[];
      // Only show homepage reviews here
      setReviews(all.filter((r) => r.show_on_homepage));
    } catch {}
    setLoading(false);
  }, [callAdmin]);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setForm({ author_name: "", rating: 5, body: "", show_on_homepage: true, active: true }); setModal("add"); };
  const openEdit = (r: Review) => {
    setEditing(r);
    setForm({ author_name: r.author_name, rating: r.rating, body: r.body, show_on_homepage: r.show_on_homepage, active: r.active });
    setModal("edit");
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, show_on_homepage: true, product_id: null };
      if (modal === "add") await callAdmin("reviews", "POST", payload);
      else await callAdmin("reviews", "PUT", { id: editing!.id, ...payload });
      await load(); setModal(null);
    } catch (e) { alert("Save failed: " + e); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    try { await callAdmin("reviews", "DELETE", { id }); await load(); } catch (e) { alert("Delete failed: " + e); }
    setDeleteId(null);
  };

  const toggleActive = async (r: Review) => {
    try {
      await callAdmin("reviews", "PUT", { id: r.id, active: !r.active });
      await load();
    } catch (e) { alert("Update failed: " + e); }
  };

  const f = (k: string, v: string | number | boolean) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-foreground text-xl font-semibold">Homepage Reviews</h2>
          <p className="text-muted-foreground text-xs mt-0.5">Google-style testimonials shown on the homepage · {reviews.length} total</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 rounded-lg transition-all"><RefreshCw size={14} /></button>
          <button onClick={openAdd} className="flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-lg hover:opacity-80 transition-opacity">
            <Plus size={14} /> Add Review
          </button>
        </div>
      </div>
      <p className="text-muted-foreground text-xs mb-6">These appear in the "What Our Customers Say" section on the homepage.</p>

      {loading ? <div className="text-muted-foreground text-sm text-center py-16">Loading…</div> : (
        <div className="space-y-2">
          {reviews.map((r) => (
            <div key={r.id} className={`p-4 rounded-xl border flex gap-4 transition-colors ${r.active ? "border-black/8 hover:bg-black/2" : "border-black/5 opacity-50"}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-foreground text-sm font-medium">{r.author_name}</p>
                  <StarRating rating={r.rating} />
                  {!r.active && <span className="text-[9px] bg-black/8 text-muted-foreground px-1.5 py-0.5 rounded uppercase tracking-wider">Hidden</span>}
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2">{r.body}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => toggleActive(r)}
                  title={r.active ? "Hide review" : "Show review"}
                  className={`p-2 rounded-lg text-xs font-medium transition-all ${r.active ? "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50"}`}
                >
                  {r.active ? "On" : "Off"}
                </button>
                <button onClick={() => openEdit(r)} className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/5 transition-all"><Pencil size={13} /></button>
                <button onClick={() => setDeleteId(r.id)} className="p-2 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-red-50 transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modal && (
          <Modal title={modal === "add" ? "Add Homepage Review" : "Edit Review"} onClose={() => setModal(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Customer Name">
                  <input className={inputCls} value={form.author_name} onChange={(e) => f("author_name", e.target.value)} placeholder="John D." />
                </Field>
                <Field label="Rating">
                  <div className="flex items-center h-[42px]">
                    <StarRating rating={form.rating} onChange={(r) => f("rating", r)} />
                  </div>
                </Field>
              </div>
              <Field label="Review Text">
                <textarea className={inputCls + " min-h-[80px] resize-none"} value={form.body} onChange={(e) => f("body", e.target.value)} placeholder="What did they say?" />
              </Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => f("active", e.target.checked)} className="sr-only" />
                <div className={`w-8 h-4 rounded-full transition-colors relative ${form.active ? "bg-emerald-500" : "bg-black/15"}`}>
                  <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white" style={{ transform: form.active ? "translateX(1.25rem)" : "translateX(0.125rem)" }} />
                </div>
                <span className="text-muted-foreground text-xs">Visible on homepage</span>
              </label>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg">Cancel</button>
                <button onClick={save} disabled={saving} className="flex-1 py-2.5 text-sm bg-foreground text-background font-semibold rounded-lg disabled:opacity-40">
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </Modal>
        )}
        {deleteId && (
          <Modal title="Delete Review" onClose={() => setDeleteId(null)}>
            <p className="text-muted-foreground text-sm mb-6">Remove this review from the homepage permanently?</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 text-sm text-muted-foreground border border-border rounded-lg">Cancel</button>
              <button onClick={() => remove(deleteId)} className="flex-1 py-2.5 text-sm bg-red-500 text-white font-semibold rounded-lg">Delete</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};


// ─── Analytics Section ────────────────────────────────────────────
const AnalyticsSection = () => {
  const [stats, setStats] = useState({ productCount: 0, reviewCount: 0, faqCount: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("faq_items").select("id", { count: "exact", head: true }),
    ]).then(([p, r, f]) => {
      setStats({ productCount: p.count || 0, reviewCount: r.count || 0, faqCount: f.count || 0 });
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-foreground text-xl font-semibold">Analytics</h2>
        <p className="text-muted-foreground text-xs mt-0.5">Store overview & Stripe insights</p>
      </div>

      {/* Site Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Products", value: stats.productCount },
          { label: "Reviews", value: stats.reviewCount },
          { label: "FAQ Items", value: stats.faqCount },
        ].map(({ label, value }) => (
          <div key={label} className="border border-black/8 rounded-xl p-6">
            <p className="text-foreground text-3xl font-light">{value}</p>
            <p className="text-muted-foreground text-xs mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* Stripe */}
      <div className="border border-black/8 rounded-xl p-6 mb-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Stripe</p>
        <h3 className="text-foreground font-semibold mb-1">Payment Dashboard</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">View real-time revenue, transactions, and customer data directly in Stripe.</p>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs border border-foreground text-foreground px-4 py-2 rounded-lg font-medium hover:bg-foreground hover:text-background transition-all"
        >
          Open Stripe Dashboard <ExternalLink size={11} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: "Revenue Overview", desc: "Total revenue, MRR, refunds", href: "https://dashboard.stripe.com/revenue" },
          { label: "Customers", desc: "Customer profiles and purchase history", href: "https://dashboard.stripe.com/customers" },
        ].map(({ label, desc, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between p-4 border border-black/8 rounded-xl hover:bg-black/2 transition-colors group">
            <div>
              <p className="text-foreground text-sm font-medium">{label}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{desc}</p>
            </div>
            <ExternalLink size={11} className="text-muted-foreground mt-0.5 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────
interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { callAdmin, logout } = useAdmin();
  const [section, setSection] = useState("products");

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-black/8 flex flex-col">
        <div className="p-6 border-b border-black/8 flex flex-col items-start">
          <img src={logoImg} alt="Logo" className="h-48 mb-2" />
          <p className="text-black/30 text-[10px] uppercase tracking-widest">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-all ${
                section === id
                  ? "bg-black/8 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-black/4"
              }`}
            >
              <Icon size={15} />
              {label}
              {section === id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-foreground/40" />}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-black/8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {section === "products" && <ProductsSection callAdmin={callAdmin} />}
              {section === "faq" && <FaqSection callAdmin={callAdmin} />}
              {section === "reviews" && <ReviewsSection callAdmin={callAdmin} />}
              {section === "analytics" && <AnalyticsSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
