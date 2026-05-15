import { useState } from "react";
import {
  Volleyball,
  Dumbbell,
  Crown,
  Users,
  Heart,
  Footprints,
  MessageCircle,
  ClipboardList,
  UsersRound,
  LogIn,
} from "lucide-react";
import logo from "../imports/image.png";
import { AuthProviderSupabase as AuthProvider, useAuthSupabase as useAuth } from "./hooks/useAuthSupabase";
import { LoginModal } from "./components/LoginModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { SuperUserDashboard } from "./components/SuperUserDashboard";
import { PublicView } from "./components/PublicView";
import { TestPersistencia } from "./components/TestPersistencia";

const disciplines = [
  {
    icon: Volleyball,
    name: "Vóley",
    emoji: "🏐",
    groupUrl:
      "https://chat.whatsapp.com/GSB343IZ57U8m82SCWmcqR",
    encargados: [
      { name: "Carlos Mendoza Alessandra", phone: "900729094" },
      { name: "Cajahuaman Granizo Luis", phone: "940941416" },
    ],
  },
  {
    icon: Footprints,
    name: "Futbol",
    emoji: "⚽",
    encargados: [
      { name: "Travezaño Rodriguez Jonh", phone: "970307122" },
      { name: "Celis Cardenas Jean", phone: "928163773" },
    ],
  },
  {
    icon: Crown,
    name: "Ajedrez",
    emoji: "♟️",
    groupUrl:
      "https://chat.whatsapp.com/FaaZjIazVtn3WYDlQtIE4r",
    encargados: [
      { name: "Wilson Porras Yordann", phone: "930418365" },
    ],
  },
  {
    icon: Users,
    name: "Drill",
    emoji: "🥁",
    groupUrl:
      "https://chat.whatsapp.com/BqQBc1zuMpD9SfFFhXyfdK",
    encargados: [
      { name: "Palma Tolentino Anjali", phone: "914261435" },
    ],
  },
  {
    icon: Dumbbell,
    name: "Básquet",
    emoji: "🏀",
    groups: [
      {
        name: "Varones",
        url: "https://chat.whatsapp.com/J2GtOvxcxlrH5gxzj9FeWO",
      },
      {
        name: "Mujeres",
        url: "https://chat.whatsapp.com/J42fsbWcNWDKGMjCki9zL4",
      },
    ],
    encargados: [
      { name: "Velasquez Luis Alexis", phone: "930532505" },
      { name: "Ramos Ore Christopher", phone: "926641516" },
    ],
  },
  {
    icon: Heart,
    name: "Atletismos",
    emoji: "🏃",
    groupUrl:
      "https://chat.whatsapp.com/G7XBIMUfH1oG1WvG9uQm3d",
    encargados: [
      { name: "Espinoza Benavides Pablo", phone: "916037021" },
    ],
  },
  {
    icon: Footprints,
    name: "Karate",
    emoji: "🥋",
    groupUrl:
      "https://chat.whatsapp.com/Ht3G0hE53RL9tQOg1sBYyp?mode=gi_t",
    encargados: [
      { name: "Segura Aliaga Walter", phone: "949191693" },
    ],
  },
];

function MainContent() {
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTestPersistencia, setShowTestPersistencia] = useState(false);

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  // Mostrar test de persistencia
  if (showTestPersistencia) {
    return <TestPersistencia />;
  }

  if (isAuthenticated) {
    if (user?.role === 'super_user') {
      return <SuperUserDashboard />;
    }
    return <AdminDashboard />;
  }

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Logo marca de agua de fondo */}
        <div
          className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Botón de login discreto */}
        <button
          onClick={() => setShowLoginModal(true)}
          className="fixed top-4 right-4 z-20 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 border border-yellow-500/50 text-yellow-400 p-3 rounded-full transition-all hover:scale-110 shadow-lg"
          title="Acceso administrativo"
        >
          <LogIn className="w-5 h-5" />
        </button>

        {/* Contenido principal */}
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <img
                src={logo}
                alt="Olimpiadas 2026 Logo"
                style={{ width: 160, height: 160, objectFit: "contain", filter: "drop-shadow(0 0 18px rgba(234,179,8,0.5))" }}
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              OLIMPIADAS 2026
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-md mx-auto">
              Contacta directamente con los encargados de cada
              disciplina
            </p>
          </header>

          {/* Tarjetas de deportes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {disciplines.map((discipline) => (
              <div
                key={discipline.name}
                className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-6 shadow-2xl hover:shadow-yellow-600/20 transition-all duration-300 hover:scale-105 hover:border-yellow-600/60"
              >
                {/* Header de la tarjeta */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-3 rounded-xl">
                    <discipline.icon
                      className="w-8 h-8 text-black"
                      strokeWidth={2.5}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-yellow-400">
                      {discipline.emoji} {discipline.name}
                    </h2>
                  </div>
                </div>

                {/* Encargados */}
                <div className="space-y-4">
                  {discipline.encargados.map(
                    (encargado, index) => (
                      <div
                        key={index}
                        className="bg-black/40 border border-gray-800 rounded-xl p-4"
                      >
                        <p className="text-gray-300 font-medium mb-1">
                          {encargado.name}
                        </p>
                        <p className="text-yellow-500 text-sm mb-3">
                          {encargado.phone}
                        </p>

                        {/* Botón WhatsApp contacto personal */}
                        <button
                          onClick={() =>
                            openWhatsApp(encargado.phone)
                          }
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-green-500/50 active:scale-95"
                        >
                          <MessageCircle className="w-5 h-5" />
                          Contactar por WhatsApp
                        </button>
                      </div>
                    ),
                  )}

                  {/* Botón grupo oficial WhatsApp */}
                  {discipline.groupUrl && (
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                      <button
                        onClick={() =>
                          window.open(
                            discipline.groupUrl,
                            "_blank",
                          )
                        }
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 active:scale-95"
                      >
                        <UsersRound className="w-5 h-5" />
                        Unirse al Grupo Oficial
                      </button>
                    </div>
                  )}

                  {/* Botones grupos múltiples (Básquet) */}
                  {discipline.groups && (
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-4 space-y-3">
                      <p className="text-gray-400 text-sm font-semibold mb-2">
                        Grupos Oficiales:
                      </p>
                      {discipline.groups.map((group, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            window.open(group.url, "_blank")
                          }
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 active:scale-95"
                        >
                          <UsersRound className="w-5 h-5" />
                          Grupo {group.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Botón formulario técnico */}
                  {discipline.formUrl && (
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                      <button
                        onClick={() =>
                          window.open(
                            discipline.formUrl,
                            "_blank",
                          )
                        }
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 active:scale-95"
                      >
                        <ClipboardList className="w-5 h-5" />
                        Llenar Formulario Técnico
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Vista pública de integrantes */}
          <PublicView />

          {/* Footer */}
          <footer className="text-center py-8 border-t border-yellow-600/20 mt-12">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              Olimpiadas 2026
            </h3>
            <p className="text-sm text-gray-500">
              Diseño responsive optimizado para móviles
            </p>
            <button
              onClick={() => setShowTestPersistencia(true)}
              className="text-xs text-gray-600 hover:text-gray-400 mt-3 transition-colors"
              title="Diagnóstico de almacenamiento"
            >
              🔧
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}