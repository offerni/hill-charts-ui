import stringToColor from "string-to-color";
import { Chart } from "../components/chart";

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

export default function Dashboard() {
  const mockSquad = mockData.data[0].squad[0];

  return (
    <div>
      <Chart scopes={mockSquad.scopes} />
    </div>
  );
}
