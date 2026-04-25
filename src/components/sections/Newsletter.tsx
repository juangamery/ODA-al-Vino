"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✓ Te has suscrito exitosamente");
        setEmail("");
      } else {
        setMessage("✗ Error al suscribirse");
      }
    } catch (error) {
      setMessage("✗ Error de conexión");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        placeholder="Tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="px-4 py-2 bg-paper/20 text-paper placeholder:text-paper/50 border border-paper/30 rounded-lg flex-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-harvest text-paper rounded-lg font-bold hover:bg-harvest/80 transition disabled:opacity-50"
      >
        {loading ? "..." : "Suscribir"}
      </button>
      {message && <div className="text-sm text-paper/80">{message}</div>}
    </form>
  );
}
