import { HTMLAttributes } from "react";
import stringToColor from "string-to-color";

const mockScopes: { colour: string; name: string; progress: number }[] = [];

for (let i = 0; i <= 100; i = i + 30) {
  mockScopes.push({
    colour: stringToColor(`scope$-${i}`),
    name: "Some unrealistic new feature",
    progress: i,
  });
}

const mockData = {
  data: [
    {
      squad: [
        {
          name: "Squad A",
          scopes: mockScopes,
        },
      ],
    },
  ],
  has_more: false,
  total_count: 2,
};

function calculateAxisPosition(progress: number) {
  const xPercent = progress;
  const yPercent = Math.sin((xPercent / 100) * Math.PI) ** 4 * 100; // Adjusted amplitude
  return { x: xPercent, y: yPercent };
}

const addScopes = (scopes: { progress: number; colour: string }[]) => {
  return scopes.map(({ progress, colour }) => {
    const style: HTMLAttributes<HTMLDivElement>["style"] = {};

    const { x, y } = calculateAxisPosition(progress);
    style.left = `calc(${x}% - 15px)`;
    style.bottom = `${y}%`;

    return (
      <div
        key={colour}
        className="absolute rounded-full p-1 border border-black"
        style={{
          width: "30px",
          height: "30px",
          background: colour,
          color: "white",
          ...style,
        }}
      >
        {progress}
      </div>
    );
  });
};
const drawLine = () => {
  const dots = [];
  for (let i = 0; i <= 100; i = i + 1) {
    const style: HTMLAttributes<HTMLDivElement>["style"] = {};

    const { x, y } = calculateAxisPosition(i);
    style.left = `${x}%`;
    style.bottom = `${y}%`;

    dots.push(
      <span className="absolute" style={{ ...style }}>
        .
      </span>
    );
  }

  return dots;
};

export default function Home() {
  const mockSquad = mockData.data[0].squad[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[60rem] h-[15rem] relative">
        {drawLine()}
        <div className="h-full border-gray-400 border-l border-dashed absolute left-1/2"></div>
        <div className="w-full border-gray-500 border-t absolute bottom-0 text-center text-sm uppercase text-gray-600">
          <div className="absolute top-0 w-1/2">Figuring things out</div>
          <div className="absolute top-0 right-0 w-1/2">Making it happen</div>
        </div>
        <div className="flex w-full h-full items-end justify-center">
          {addScopes(mockSquad.scopes)}
        </div>
      </div>
    </main>
  );
}
