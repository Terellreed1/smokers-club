import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const TOKEN_KEY = "lc_admin_token";

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) { setIsAdmin(false); return; }
    supabase.functions.invoke("admin-auth?action=verify", {
      method: "POST",
      body: { token: stored },
    }).then(({ data }) => {
      if (data?.valid) { setIsAdmin(true); setToken(stored); }
      else { localStorage.removeItem(TOKEN_KEY); setIsAdmin(false); setToken(null); }
    });
  }, []);

  const login = async (password: string) => {
    const { data, error } = await supabase.functions.invoke("admin-auth?action=login", {
      method: "POST",
      body: { password },
    });
    if (error || data?.error) throw new Error(data?.error || "Login failed");
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setIsAdmin(true);
    return data.token;
  };

  const logout = async () => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      await supabase.functions.invoke("admin-auth?action=logout", {
        method: "POST",
        body: { token: t },
      });
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setIsAdmin(false);
  };

  const callAdmin = async (resource: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: object) => {
    const t = localStorage.getItem(TOKEN_KEY);
    const { data, error } = await supabase.functions.invoke(`admin-data?resource=${resource}`, {
      method,
      body,
      headers: { Authorization: `Bearer ${t}` },
    });
    if (error) throw error;
    if (data?.error) throw new Error(JSON.stringify(data.error));
    return data;
  };

  return { isAdmin, token, login, logout, callAdmin };
}
