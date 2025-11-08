import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, } from 'recharts';



export default function LineChartComp({ data }: { data: { name: string; uv: number; pv: number; amt: number; }[] }) {
  return (
      <LineChart
        data={data}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
        <XAxis dataKey="name" />
        <YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
        <Legend align="right" />
      </LineChart>
  );
}