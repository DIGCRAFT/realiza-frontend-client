tsx
import { useState } from "react";
import { WoodColor } from "@/types/products";

interface ColorVisualizerProps {
  selectedColor: WoodColor | undefined;
  productLine: string;
}

// URLs estáveis do GitHub para garantir o carregamento
const FINISH_IMAGES: Record<string, string> = {
  "BRANCO": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20Branco%20para%20Site%20Realiza%20gmni.png?raw=true",
  "PRETO": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20Preta%20para%20Site%20Realiza%20gmni.jpeg.png?raw=true",
  "AÇO CORTEN": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/finishes/Esqudria%20cor%20a%C3%A7o%20cort%C3%8Am%20para%20Site%20Realiza%20gmni.png?raw=true"
};

const PROFILE_IMAGES: Record<string, string> = {
  "BRANCO": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/Branco.png?raw=true",
  "PRETO": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/Preto.jpg?raw=true",
  "AÇO CORTEN": "https://github.com/DIGCRAFT/realiza-frontend-client/blob/main/client/public/images/profiles/A%C3%A7o%20Corten.png?raw=true"
};

export default function ColorVisualizer({ selectedColor, productLine }: ColorVisualizerProps) {
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);

  // Normalizar nome da cor para as chaves do objeto (ex: "Alumínio" -> "AÇO CORTEN")
  const getColorKey = (name: string): string => {
    const normalized = name.toUpperCase();
    if (normalized === "ALUMÍNIO" || normalized === "ALUMINIO") return "AÇO CORTEN";
    return normalized;
  };

  const activeColorKey = selectedColor ? getColorKey(selectedColor.name) : "BRANCO";
  const finishUrl = FINISH_IMAGES[activeColorKey] || FINISH_IMAGES["BRANCO"];
  const profileUrl = PROFILE_IMAGES[activeColorKey] || PROFILE_IMAGES["BRANCO"];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg text-primary flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Visualize Sua Escolha
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        {/* Lado Esquerdo: Acabamento Principal */}
        <div 
          className="relative lg:col-span-7 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in group"
          onClick={() => setIsExpandedModalOpen(true)}
        >
          <img 
            src={finishUrl} 
            alt="Acabamento" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-6 text-white pointer-events-none">
            <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-1">ACABAMENTO</p>
            <h3 className="text-2xl font-bold">{activeColorKey}</h3>
            <p className="text-xs opacity-80">{productLine}</p>
          </div>

          {/* Ícone de Expansão */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </div>
        </div>

        {/* Lado Direito: Perfil Técnico */}
        <div className="lg:col-span-3 relative aspect-square md:aspect-auto rounded-lg overflow-hidden border border-gray-100 bg-white shadow-sm flex items-center justify-center p-4">
          <img 
            src={profileUrl} 
            alt="Perfil Técnico" 
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest text-gray-500 shadow-sm border border-gray-100">
              Perfil Técnico
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        * Visualização em ripas de alumínio. As cores podem variar conforme iluminação, acabamento e material aplicado.
      </p>

      {/* Modal de Expansão (Full Screen) */}
      {isExpandedModalOpen && (
        <div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[100] p-4 cursor-zoom-out"
          onClick={() => setIsExpandedModalOpen(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img 
              src={finishUrl} 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute -top-10 right-0 text-white text-3xl font-light hover:opacity-70 transition-opacity">&times;</button>
          </div>
        </div>
      </div>
      
      {/* ... (Modal de Expansão) ... */}
    </div>
  );
}
