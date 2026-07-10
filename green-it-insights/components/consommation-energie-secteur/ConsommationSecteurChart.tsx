"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  Heading,
  Text,
  Box,
} from "@radix-ui/themes";


const data = [
  { name: "Industrie", value: 37, description: "Acier, ciment, fabrication électronique" },
  { name: "Résidentiel", value: 30, description:"Chauffage, climatisation, éclairage" },
  { name: "Transport", value: 26, description:"Camions, avions, bateaux, trains" },
  { name: "Numérique", value: 4,  description: "Datacenters, smartphones, ordinateurs, IA" },
  { name: "Agriculture", value: 3, description: "Irrigation, tracteurs, équipements agricoles" },
];


const COLORS = [
  "var(--grass-9)",
  "var(--brown-9)",
  "var(--grass-10)",
  "#4F8FBF",
  "var(--brown-10)",
];


export default function ConsommationSecteurChart() {
  return (
    <Card size="3">

      <Box p="4">

        <Heading size="6">
          Répartition mondiale de la consommation d&apos;énergie
        </Heading>

        <Text size="2">
          Répartition estimée par secteur d&apos;activité.
        </Text>


        <Box height="350px" mt="5">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
                label={({name, value}) => `${name} ${value}%`}
              >

                {data.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip
  formatter={(value, name, props) => [
    `${value}%`,
    props.payload.description
  ]}
/>

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </Box>

      </Box>

    </Card>
  );
}