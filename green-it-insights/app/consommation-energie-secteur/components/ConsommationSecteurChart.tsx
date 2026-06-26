"use client";

import {PieChart,Pie,Cell,ResponsiveContainer,Tooltip,Legend} from "recharts";
import {Card,Heading,Text,Box} from "@radix-ui/themes";

const data = [
  {
    name: "Industrie",
    value: 37,
    description: "Acier, ciment, fabrication électronique",
  },
  {
    name: "Résidentiel",
    value: 30,
    description: "Chauffage, climatisation, éclairage",
  },
  {
    name: "Transport",
    value: 26,
    description: "Voitures, camions, avions, bateaux",
  },
  {
    name: "Numérique",
    value: 4,
    description: "Datacenters, smartphones, IA",
  },
  {
    name: "Agriculture",
    value: 3,
    description: "Irrigation, machines agricoles",
  },
];

const COLORS = [
  "#112F1F", 
  "#3D2E2B",
  "#6B8F71", 
  "#4F8FBF", 
  "#9AA66D", 
];


export default function ConsommationSecteurChart() {
  return (
    <Card size="3">
      <Box p="4">

        <Heading size="6">
          Répartition mondiale de la consommation d'énergie
        </Heading>

        <Text size="2" color="gray">
          Répartition estimée par secteur d'activité.
        </Text>


        <Box height="350px" mt="5">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                paddingAngle={2}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>


              <Tooltip
                formatter={(value) => `${value}%`}
              />


              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </Box>

      </Box>
    </Card>
  );
}