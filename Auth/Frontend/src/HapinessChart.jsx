import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const HappinessChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="happinessScore" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HappinessChart;
