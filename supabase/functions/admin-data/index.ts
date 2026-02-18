import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function verifyAdmin(supabase: ReturnType<typeof createClient>, token: string | null) {
  if (!token) return false;
  const { data } = await supabase
    .from("admin_sessions")
    .select("expires_at")
    .eq("token", token)
    .single();
  if (!data || new Date(data.expires_at) < new Date()) return false;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  const isAdmin = await verifyAdmin(supabase, token);

  if (!isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const url = new URL(req.url);
  const resource = url.searchParams.get("resource");

  // ── PRODUCTS ──
  if (resource === "products") {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "POST") {
      const body = await req.json();
      const { data, error } = await supabase.from("products").insert(body).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        status: error ? 400 : 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "PUT") {
      const body = await req.json();
      const { id, ...rest } = body;
      const { data, error } = await supabase.from("products").update(rest).eq("id", id).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "DELETE") {
      const body = await req.json();
      const { error } = await supabase.from("products").delete().eq("id", body.id);
      return new Response(JSON.stringify(error ? { error } : { ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // ── FAQ ──
  if (resource === "faq") {
    if (req.method === "GET") {
      const { data, error } = await supabase.from("faq_items").select("*").order("sort_order");
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "POST") {
      const body = await req.json();
      const { data, error } = await supabase.from("faq_items").insert(body).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        status: error ? 400 : 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "PUT") {
      const body = await req.json();
      const { id, ...rest } = body;
      const { data, error } = await supabase.from("faq_items").update(rest).eq("id", id).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "DELETE") {
      const body = await req.json();
      const { error } = await supabase.from("faq_items").delete().eq("id", body.id);
      return new Response(JSON.stringify(error ? { error } : { ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  // ── REVIEWS ──
  if (resource === "reviews") {
    if (req.method === "GET") {
      const { data, error } = await supabase.from("reviews").select("*, products(name)").order("created_at", { ascending: false });
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "POST") {
      const body = await req.json();
      const { data, error } = await supabase.from("reviews").insert(body).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        status: error ? 400 : 201,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "PUT") {
      const body = await req.json();
      const { id, ...rest } = body;
      const { data, error } = await supabase.from("reviews").update(rest).eq("id", id).select().single();
      return new Response(JSON.stringify(error ? { error } : data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (req.method === "DELETE") {
      const body = await req.json();
      const { error } = await supabase.from("reviews").delete().eq("id", body.id);
      return new Response(JSON.stringify(error ? { error } : { ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
