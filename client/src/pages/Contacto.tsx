import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_INFO } from "@shared/data";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Loader2, Upload, FileText, X, Star, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Document upload state
  const [docData, setDocData] = useState({ clientName: "", clientEmail: "", description: "" });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: places } = trpc.places.summary.useQuery(undefined, {
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  const sendContact = trpc.contact.send.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Consulta enviada correctamente");
    },
    onError: (err) => toast.error("Error: " + err.message),
  });

  const uploadDoc = trpc.documents.upload.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Por favor, completa los campos obligatorios");
      return;
    }
    sendContact.mutate(formData);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((f) => f.size <= 10 * 1024 * 1024);
      if (validFiles.length < files.length) {
        toast.error("Algunos archivos superan el límite de 10MB");
      }
      setSelectedFiles((prev) => {
        const merged = [...prev, ...validFiles];
        if (merged.length > 5) {
          toast.error("Máximo 5 archivos por envío");
          return merged.slice(0, 5);
        }
        return merged;
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docData.clientName || !docData.clientEmail || selectedFiles.length === 0) {
      toast.error("Completa nombre, email y selecciona al menos un archivo");
      return;
    }
    const totalBytes = selectedFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > 20 * 1024 * 1024) {
      toast.error("El total de archivos no puede superar 20MB");
      return;
    }
    setUploading(true);
    try {
      const files = await Promise.all(
        selectedFiles.map(async (file) => ({
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          fileSize: file.size,
          fileBase64: await fileToBase64(file),
        }))
      );
      await uploadDoc.mutateAsync({
        clientName: docData.clientName,
        clientEmail: docData.clientEmail,
        description: docData.description,
        files,
      });
      setUploadSuccess(true);
      toast.success("Documentos enviados correctamente");
    } catch (err: any) {
      toast.error("Error al enviar documentos: " + (err.message || "inténtalo de nuevo"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <section className="bg-[#112250] text-white py-20">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.span variants={fadeUp} className="text-[#C19D4E] text-sm font-semibold uppercase tracking-wider">Contacto</motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mt-3 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Contacta con Nosotros
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 text-lg leading-relaxed">
              ¿Tienes dudas sobre tu situación legal? Envíanos tu consulta y te responderemos lo antes posible.
                  También puedes enviarnos documentos necesarios para tus trámites.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E9]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-[#112250] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                    <Send className="w-5 h-5 inline mr-2" /> Formulario de Contacto
                  </h2>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#112250] mb-2">Consulta Enviada</h3>
                      <p className="text-gray-600 mb-4">Te responderemos lo antes posible.</p>
                      <Button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }} variant="outline" className="border-[#112250] text-[#112250]">
                        Enviar Otra Consulta
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Nombre *</Label>
                          <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre" className="bg-white" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Email *</Label>
                          <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" className="bg-white" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Teléfono</Label>
                          <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+34 600 000 000" className="bg-white" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Asunto *</Label>
                          <Input value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Asunto de tu consulta" className="bg-white" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-[#112250] mb-1 block">Mensaje *</Label>
                        <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe tu consulta o situación..." rows={5} className="bg-white" />
                      </div>
                      <Button type="submit" disabled={sendContact.isPending} className="w-full bg-[#C19D4E] hover:bg-[#a8873f] text-white py-6">
                        {sendContact.isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5 mr-2" /> Enviar Consulta</>}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Document Upload */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-[#112250] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
                    <Upload className="w-5 h-5 inline mr-2" /> Enviar Documentos
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Envíanos los documentos de tus trámites por correo. Aceptamos PDF, imágenes y Word (máx. 10MB por archivo, 5 archivos / 20MB en total). No se almacenan en el servidor: llegan como adjuntos a nuestro email.
                  </p>
                  {uploadSuccess ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#112250] mb-2">Documentos Enviados</h3>
                      <p className="text-gray-600 mb-4">Hemos recibido tus documentos en nuestro correo. Te contactaremos si necesitamos algo más.</p>
                      <Button onClick={() => { setUploadSuccess(false); setSelectedFiles([]); setDocData({ clientName: "", clientEmail: "", description: "" }); }} variant="outline" className="border-[#112250] text-[#112250]">
                        Enviar Más Documentos
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpload} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Tu Nombre *</Label>
                          <Input value={docData.clientName} onChange={(e) => setDocData({ ...docData, clientName: e.target.value })} placeholder="Tu nombre" className="bg-white" />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-[#112250] mb-1 block">Tu Email *</Label>
                          <Input type="email" value={docData.clientEmail} onChange={(e) => setDocData({ ...docData, clientEmail: e.target.value })} placeholder="tu@email.com" className="bg-white" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-semibold text-[#112250] mb-1 block">Descripción (opcional)</Label>
                        <Input value={docData.description} onChange={(e) => setDocData({ ...docData, description: e.target.value })} placeholder="Ej: Pasaporte, contrato de trabajo..." className="bg-white" />
                      </div>

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#C19D4E] transition-colors"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Haz clic para seleccionar archivos</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC (máx. 10MB c/u · hasta 5)</p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="space-y-2">
                          {selectedFiles.map((file, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                              <FileText className="w-5 h-5 text-[#C19D4E]" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#112250] truncate">{file.name}</p>
                                <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                              <button type="button" onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button type="submit" disabled={uploading || uploadDoc.isPending} className="w-full bg-[#112250] hover:bg-[#1a2d5e] text-white py-6">
                        {uploading || uploadDoc.isPending ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enviando...</> : <><Mail className="w-5 h-5 mr-2" /> Enviar Documentos</>}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 space-y-5">
                  <h3 className="text-lg font-bold text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>Datos de Contacto</h3>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-4 p-3 bg-[#F5F0E9] rounded-lg hover:bg-[#e8e0d3] transition-colors">
                    <Phone className="w-5 h-5 text-[#112250]" />
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="text-sm font-semibold text-[#112250]">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-4 p-3 bg-[#F5F0E9] rounded-lg hover:bg-[#e8e0d3] transition-colors">
                    <Mail className="w-5 h-5 text-[#112250]" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-[#112250]">{CONTACT_INFO.email}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-3 bg-[#F5F0E9] rounded-lg">
                    <MapPin className="w-5 h-5 text-[#112250]" />
                    <div>
                      <p className="text-xs text-gray-500">Dirección</p>
                      <p className="text-sm font-semibold text-[#112250]">{CONTACT_INFO.address}</p>
                    </div>
                  </div>
                  <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white mt-2">
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {places && places.userRatingCount > 0 && (
                <Card className="border-0 shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#C19D4E] mb-3">
                        Valoración en Google
                      </p>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-bold text-[#112250] leading-none">
                          {places.rating.toFixed(1)}
                        </span>
                        <div>
                          <div className="flex gap-0.5 mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(places.rating)
                                    ? "fill-[#C19D4E] text-[#C19D4E]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            {places.userRatingCount} reseñas
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {(places.googleMapsUri || CONTACT_INFO.googleMapsUri) && (
                          <a
                            href={places.googleMapsUri || CONTACT_INFO.googleMapsUri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#112250] font-medium inline-flex items-center hover:underline"
                          >
                            Ver reseñas en Google
                            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                          </a>
                        )}
                        <a
                          href={places.writeReviewUri || CONTACT_INFO.googleWriteReviewUri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="w-full bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                            Dejar una reseña
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border-0 shadow-md bg-[#112250] text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>Horario de Atención</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Lunes - Viernes</span>
                      <span>9:00 - 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Sábados</span>
                      <span>10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Domingos</span>
                      <span>Cerrado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
