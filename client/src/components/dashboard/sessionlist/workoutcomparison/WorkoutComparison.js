/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  ResponsiveContainer,
  AreaChart,
  PieChart,
  Area,
  Pie,
  CartesianGrid,
  XAxis,
  YAxis,
  Sector,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

export default function WorkoutComparison({ workouts }) {
  const [pieData, setPieData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const labelColor = useColorModeValue('black', 'white');
  const deadliftColor = useColorModeValue('#5f5c97', '#8884d8');
  const benchColor = useColorModeValue('#cc9520', '#ffbb28');
  const overheadColor = useColorModeValue('black', '#ffe2ab');
  const squatColor = useColorModeValue('#5b8d6d', '#75b58d');
  const bicepColor = useColorModeValue('#f2665c', '#f2665c');

  let renderLabel = function (entry) {
    return entry.name;
  };

  function dataCreation(data) {
    let workoutData = [];
    let organisedPieData = [
      { name: 'Deadlift', value: 0 },
      { name: 'Bench', value: 0 },
      { name: 'Overhead', value: 0 },
      { name: 'Squat', value: 0 },
      { name: 'Bicep Curl', value: 0 },
    ];
    const month = new Date().getMonth();

    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
    ) {
      let count = 1;
      while (count < 32) {
        workoutData.push({
          name: count,
          Deadlift: 0,
          Bench: 0,
          Squat: 0,
          Overhead: 0,
          'Bicep Curl': 0,
        });
        count++;
      }
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      let count = 1;
      while (count < 31) {
        workoutData.push({
          name: count,
          Deadlift: 0,
          Bench: 0,
          Squat: 0,
          Overhead: 0,
          'Bicep Curl': 0,
        });
        count++;
      }
    } else {
      let count = 1;
      while (count < 29) {
        workoutData.push({
          name: count,
          Deadlift: 0,
          Bench: 0,
          Squat: 0,
          Overhead: 0,
          'Bicep Curl': 0,
        });
        count++;
      }
    }
    for (let session of data) {
      const splitDate = session.date.split('-');
      const day = splitDate[2].slice(0, 2);
      const month = Number(splitDate[1]) - 1;

      if (month === new Date().getMonth() && session.routine.length > 0) {
        for (let workout of session.routine) {
          if (
            workout.lift === 'Deadlift' ||
            workout.lift === 'Bench' ||
            workout.lift === 'Squat' ||
            workout.lift === 'Overhead' ||
            workout.lift === 'Bicep Curl'
          ) {
            const theOne = workout.lift;
            workoutData[Number(day) - 1][theOne] = workout.weight;
            switch (theOne) {
              case 'Deadlift':
                organisedPieData[0].value += 1;
                break;
              case 'Bench':
                organisedPieData[1].value += 1;
                break;
              case 'Overhead':
                organisedPieData[2].value += 1;
                break;
              case 'Squat':
                organisedPieData[3].value += 1;
                break;
              case 'Bicep Curl':
                organisedPieData[4].value += 1;
                break;

              default:
                break;
            }
          }
        }
      }
    }
    setPieData(organisedPieData);
    console.log(pieData);
    return workoutData;
  }

  useEffect(() => {
    setAreaData(dataCreation(workouts));
  }, [workouts]);

  return (
    <Flex justify="space-around" pb="1.5rem" w="100%">
      <ResponsiveContainer
        width="20%"
        height="50%"
        minWidth="25rem"
        minHeight="20rem"
      >
        <PieChart width={75} height={50}>
          <Pie
            isAnimationActive={false}
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#FFBB28"
            dataKey="value"
            nameKey="name"
            label={renderLabel}
          >
            <Cell key={`cell-0`} fill={deadliftColor} />
            <Cell key={`cell-1`} fill={benchColor} />
            <Cell key={`cell-2`} fill={overheadColor} />
            <Cell key={`cell-3`} fill={squatColor} />
            <Cell key={`cell-4`} fill={bicepColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer
        width="50%"
        height="50%"
        minWidth="40rem"
        minHeight="20rem"
      >
        <AreaChart data={areaData}>
          <XAxis dataKey="name" tick={{ fill: labelColor, fontSize: 12.5 }} />
          <YAxis tick={{ fill: labelColor, fontSize: 12.5 }} />
          <CartesianGrid stroke={labelColor} />
          <Tooltip tick={{ fill: labelColor }} />
          <Legend verticalAlign="top" height={35} />
          <Area
            type="monotone"
            dataKey="Deadlift"
            stackId="1"
            stroke={deadliftColor}
            fill={deadliftColor}
          />
          <Area
            type="monotone"
            dataKey="Bench"
            stackId="2"
            stroke={benchColor}
            fill={benchColor}
          />
          <Area
            type="monotone"
            dataKey="Squat"
            stackId="3"
            stroke={squatColor}
            fill={squatColor}
          />
          <Area
            type="monotone"
            dataKey="Overhead"
            stackId="4"
            stroke={overheadColor}
            fill={overheadColor}
          />
          <Area
            type="monotone"
            dataKey="Bicep Curl"
            stackId="5"
            stroke={bicepColor}
            fill={bicepColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
}
