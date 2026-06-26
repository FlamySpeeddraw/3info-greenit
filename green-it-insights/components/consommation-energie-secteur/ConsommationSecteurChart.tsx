"use client";

<<<<<<< HEAD
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
=======
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
>>>>>>> 6396bff (Fix components placement)
];


export default function ConsommationSecteurChart() {
  return (
    <Card size="3">
<<<<<<< HEAD

=======
>>>>>>> 6396bff (Fix components placement)
      <Box p="4">

        <Heading size="6">
          Répartition mondiale de la consommation d'énergie
        </Heading>

<<<<<<< HEAD
        <Text size="2">
=======
        <Text size="2" color="gray">
>>>>>>> 6396bff (Fix components placement)
          Répartition estimée par secteur d'activité.
        </Text>


        <Box height="350px" mt="5">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
<<<<<<< HEAD
                dataKey="value"
=======
>>>>>>> 6396bff (Fix components placement)
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
<<<<<<< HEAD
                paddingAngle={2}
                label={({name, value}) => `${name} ${value}%`}
              >

                {data.map((item, index) => (
                  <Cell
                    key={item.name}
=======
                dataKey="value"
                paddingAngle={2}
              >

                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
>>>>>>> 6396bff (Fix components placement)
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

<<<<<<< HEAD
              <Tooltip
  formatter={(value, name, props) => [
    `${value}%`,
    props.payload.description
  ]}
/>
=======

              <Tooltip
                formatter={(value) => `${value}%`}
              />

>>>>>>> 6396bff (Fix components placement)

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </Box>

      </Box>
<<<<<<< HEAD

=======
>>>>>>> 6396bff (Fix components placement)
    </Card>
  );
}