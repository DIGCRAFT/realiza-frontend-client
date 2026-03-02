import { useState } from "react";
import { WoodColor } from "@/types/products";

interface ColorVisualizerProps {
  selectedColor: WoodColor | undefined;
  productLine: string;
}

export default function ColorVisualizer({
  selectedColor,
}: ColorVisualizerProps) {
  const [isExpandedModalOpen, setIsExpandedModalOpen] = useState(false);

  // Calcular cor RGB a partir do hex
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const colorRgb = selectedColor?.hexCode
    ? hexToRgb(selectedColor.hexCode as string)
    : { r: 128, g: 128, b: 128 };

  // Gerar ripas com variação de brilho usando textura da imagem
  const generateRipas = () => {
    const ripas = [];
    const numberOfRipas = 24;

    for (let i = 0; i < numberOfRipas; i++) {
      // Criar variação de brilho para simular veios de madeira
      const variation = Math.sin(i * 0.5) * 0.15 + 0.1;
      const brightness = 1 + variation;

      ripas.push(
        <div
          key={i}
          className="flex-1 relative overflow-hidden"
          style={{
            backgroundImage: selectedColor?.imageName
              ? `url(/images/${selectedColor.imageName})`
              : `linear-gradient(rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}), rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}))`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: `inset -1px 0 0 rgba(0, 0, 0, 0.1), inset 1px 0 0 rgba(255, 255, 255, 0.1)`,
            filter: `brightness(${brightness})`,
          }}
        />
      );
    }
    return ripas;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Título/Cabeçalho do card */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg text-primary flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Visualize Sua Escolha
        </h4>
      </div>

      {/* Visualizador de Ripas + Referência */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <div className="relative lg:col-span-7 aspect-video bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-gray-800">
          {/* Ripas Verticais quando não há slatImage */}
          <div className="flex h-full w-full gap-0.5 p-4 bg-black">
            {selectedColor ? (
              selectedColor?.slatImage ? (
                <img
                  src={`/images/${selectedColor.slatImage}`}
                  alt={selectedColor.name}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                generateRipas()
              )
            ) : null}
          </div>

          {/* Ícone de Expansão */}
          {selectedColor && (
            <button
              onClick={() => setIsExpandedModalOpen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-lg transition-colors"
              title="Expandir visualização"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
          )}
        </div>

        {selectedColor?.imageName ? (
          <div className="lg:col-span-3 rounded-lg overflow-hidden border border-gray-200 bg-white min-h-[180px]">
            <img
              src={`/images/${selectedColor.imageName}`}
              alt="Referência de cor cerejeira escura"
              className="w-full h-full object-cover"
            />
          </div>
        ) : null}
      </div>

      {/* Legenda sobre a visualização */}
      <p className="text-xs text-muted-foreground mt-3 text-center">
        * Visualização em ripas de alumínio. As cores podem variar conforme
        iluminação, acabamento e material aplicado.
      </p>

      {/* Card de dica */}
      {selectedColor && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Dica:</strong> A cor {selectedColor.name} é ideal para{" "}
            {selectedColor.category === "wood"
              ? "ambientes que buscam aconchego e sofisticação natural, com veios de madeira autênticos"
              : "projetos modernos e minimalistas"}
            .
          </p>
        </div>
      )}

      {/* Modal de Expansão */}
      {isExpandedModalOpen && selectedColor && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setIsExpandedModalOpen(false)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
            {/* Botão de Fechar */}
            <button
              onClick={() => setIsExpandedModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              title="Fechar"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Visualizador Expandido */}
            <div
              className="relative w-full aspect-video bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border border-gray-700"
              onClick={e => e.stopPropagation()}
            >
              {/* Ripas Verticais */}
              <div className="flex h-full w-full gap-0.5 p-8 bg-black">
                {selectedColor?.slatImage ? (
                  <img
                    src={`/images/${selectedColor.slatImage}`}
                    alt={selectedColor.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  generateRipas()
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
