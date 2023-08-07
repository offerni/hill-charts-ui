import { HTMLAttributes } from "react";

function calculateAxisPosition(progress: number) {
  const xPercent = progress;
  const yPercent = Math.sin((xPercent / 100) * Math.PI) ** 4 * 100;
  return { x: xPercent, y: yPercent };
}

function addScopes(
  scopes: { progress: number; colour: string; name: string }[]
) {
  return scopes.map(({ progress, colour, name }) => {
    const style: HTMLAttributes<HTMLDivElement>["style"] = {};

    const { x, y } = calculateAxisPosition(progress);
    style.left = `calc(${x}% - 15px)`;
    style.bottom = `${y}%`;

    return (
      <div
        key={colour}
        className="absolute flex gap-1"
        style={{
          ...style,
        }}
      >
        <div
          style={{ width: "20px", height: "20px", background: colour }}
          className="rounded-full p-1 border border-black"
        />
        <span className="text-xs">{name}</span>
      </div>
    );
  });
}
function drawLine() {
  const dots = [];
  for (let i = 0; i <= 100; i = i + 1) {
    const style: HTMLAttributes<HTMLDivElement>["style"] = {};

    const { x, y } = calculateAxisPosition(i);
    style.left = `${x}%`;
    style.bottom = `${y}%`;

    dots.push(
      <span key={i} className="absolute text-gray-300" style={{ ...style }}>
        .
      </span>
    );
  }

  return dots;
}

interface ChartProps {
  scopes: { progress: number; colour: string; name: string }[];
}

export function Chart({ scopes }: ChartProps) {
  return (
    <div className="w-full h-3/4 max-w-[60rem] max-h-[10rem] relative">
      {drawLine()}
      <div className="h-full border-gray-400 border-l border-dashed absolute left-1/2"></div>
      <div className="w-full border-gray-500 border-t absolute bottom-0 text-center text-sm uppercase text-gray-600">
        <div className="absolute top-0 w-1/2">Figuring things out</div>
        <div className="absolute top-0 right-0 w-1/2">Making it happen</div>
      </div>
      <div className="flex w-full h-full items-end justify-center">
        {addScopes(scopes)}
      </div>
    </div>
  );
}
