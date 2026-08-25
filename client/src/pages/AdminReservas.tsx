import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { CalendarIcon, CheckCircle, XCircle, Clock, Loader2, ShieldAlert, Mail, Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  confirmed: { label: "Confirmada", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  cancelled: { label: "Rechazada", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
} as const;

export default function AdminReservas() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const { data: bookings, isLoading, refetch } = trpc.booking.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const confirmMutation = trpc.booking.confirm.useMutation({
    onSuccess: () => {
      toast.success("Cita confirmada. Se ha enviado email al cliente.");
      refetch();
    },
    onError: (err) => toast.error("Error: " + err.message),
  });

  const rejectMutation = trpc.booking.reject.useMutation({
    onSuccess: () => {
      toast.success("Cita rechazada. Se ha notificado al cliente.");
      refetch();
    },
    onError: (err) => toast.error("Error: " + err.message),
  });

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#C19D4E]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <section className="bg-[#112250] text-white py-16">
          <div className="container">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Panel de Administración</h1>
          </div>
        </section>
        <section className="py-20 bg-[#F5F0E9]">
          <div className="container max-w-md text-center">
            <ShieldAlert className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#112250] mb-3">Acceso Restringido</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión como administrador para acceder a esta sección.</p>
            <Link href="/login">
              <Button className="bg-[#112250] hover:bg-[#1a2d5e] text-white">Iniciar Sesión</Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (user?.role !== "admin") {
    return (
      <>
        <section className="bg-[#112250] text-white py-16">
          <div className="container">
            <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Panel de Administración</h1>
          </div>
        </section>
        <section className="py-20 bg-[#F5F0E9]">
          <div className="container max-w-md text-center">
            <ShieldAlert className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#112250] mb-3">Sin Permisos</h2>
            <p className="text-gray-600">No tienes permisos de administrador para acceder a esta sección.</p>
          </div>
        </section>
      </>
    );
  }

  const pending = bookings?.filter((b) => b.status === "pending") || [];
  const confirmed = bookings?.filter((b) => b.status === "confirmed") || [];
  const cancelled = bookings?.filter((b) => b.status === "cancelled") || [];

  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            <CalendarIcon className="w-8 h-8 inline mr-3" />
            Gestión de Reservas
          </h1>
          <p className="text-white/70 mt-2">Confirma o rechaza las citas de tus clientes</p>
        </div>
      </section>

      <section className="py-12 bg-[#F5F0E9]">
        <div className="container">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#112250]">{pending.length}</p>
                  <p className="text-sm text-gray-500">Pendientes</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#112250]">{confirmed.length}</p>
                  <p className="text-sm text-gray-500">Confirmadas</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#112250]">{cancelled.length}</p>
                  <p className="text-sm text-gray-500">Rechazadas</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#C19D4E] mx-auto" />
              <p className="text-gray-500 mt-3">Cargando reservas...</p>
            </div>
          ) : !bookings || bookings.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#112250] mb-2">No hay reservas</h3>
                <p className="text-gray-500">Cuando los clientes reserven citas, aparecerán aquí.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Pending first, then confirmed, then cancelled */}
              {[...pending, ...confirmed, ...cancelled].map((booking, i) => {
                const config = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className={`border-0 shadow-sm ${booking.status === "pending" ? "ring-2 ring-amber-300" : ""}`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Info */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="text-lg font-bold text-[#112250]">{booking.name}</h3>
                              <Badge variant="outline" className={config.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                            <p className="text-sm font-semibold text-[#C19D4E]">{booking.serviceType}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" /> {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {booking.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-4 h-4" /> {booking.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-4 h-4" /> {booking.phone}
                              </span>
                            </div>
                            {booking.message && (
                              <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mt-2">
                                <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                                <p>{booking.message}</p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          {booking.status === "pending" && (
                            <div className="flex gap-2 shrink-0">
                              <Button
                                onClick={() => confirmMutation.mutate({ id: booking.id })}
                                disabled={confirmMutation.isPending || rejectMutation.isPending}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                {confirmMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                )}
                                Confirmar
                              </Button>
                              <Button
                                onClick={() => rejectMutation.mutate({ id: booking.id })}
                                disabled={confirmMutation.isPending || rejectMutation.isPending}
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                {rejectMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin mr-1" />
                                ) : (
                                  <XCircle className="w-4 h-4 mr-1" />
                                )}
                                Rechazar
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
