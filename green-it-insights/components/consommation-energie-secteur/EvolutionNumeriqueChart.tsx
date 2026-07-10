"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  Heading,
  Text,
  Box,
} from "@radix-ui/themes";


const data = [
  {
    year: 2005,
    value: 2,
    event: "Généralisation d'Internet",
  },
  {
    year: 2010,
    value: 2.5,
    event: "Explosion des smartphones",
  },
  {
    year: 2015,
    value: 3,
    event: "Streaming et cloud",
  },
  {
    year: 2020,
    value: 3.4,
    event: "Streaming massif et visioconférences",
  },
  {
    year: 2025,
    value: 4,
    event: "IA et multiplication des datacenters",
  },
];


export default function EvolutionNumeriqueChart() {

  return (
    <Card size="3">

      <Box p="4">

        <Heading size="6">
          Évolution de la consommation énergétique du numérique
        </Heading>

        <Text size="2">
          Part estimée du numérique dans la consommation mondiale d'énergie.
        </Text>


        <Box height="350px" mt="5">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.3}
              />


              <XAxis
                dataKey="year"
              />


              <YAxis
                unit="%"
                domain={[0, 5]}
              />


              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  "Part du numérique",
                ]}
                labelFormatter={(year) =>
                  `Année : ${year}`
                }
              />


              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--grass-9)"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "var(--grass-9)",
                }}
              />


            </LineChart>

          </ResponsiveContainer>

        </Box>

      </Box>

    </Card>
  );
}