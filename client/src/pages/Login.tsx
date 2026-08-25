import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const utils = trpc.useUtils();

  const login = trpc.auth.login.useMutation({
    onSuccess: async (data) => {
      utils.auth.me.setData(undefined, data.user);
      await utils.auth.me.invalidate();
      toast.success("Sesión iniciada");
      setLocation(data.user.role === "admin" ? "/admin/reservas" : "/");
    },
    onError: (err) => {
      toast.error(err.message || "No se pudo iniciar sesión");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email: email.trim(), password });
  };

  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Acceso administración
          </h1>
          <p className="text-white/70 mt-2">Tu Gestión Legal</p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F0E9]">
        <div className="container max-w-md">
          <div className="bg-white border border-[#E8E0D4] p-8 shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#112250]/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-[#112250]" />
              </div>
            </div>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="info@tugestionlegal.es"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={login.isPending}
                className="w-full bg-[#112250] hover:bg-[#1a2d5e] text-white py-6"
              >
                {login.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Entrando…
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
