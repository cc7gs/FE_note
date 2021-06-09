import React, { useState } from 'react';
import TrafficLightItem from './TrafficItem';
import type { LightConfig } from './data';

const defaultConfig: LightConfig[] = [
  { color: 'red', duration: 2000, twinkleDuration: 1000 },
  { color: 'green', duration: 2000, twinkleDuration: 1000 },
  { color: 'yellow', duration: 1000 },
];
export function TrafficLight({ config }: { config?: LightConfig[] }) {
  const [curIdx, setCurIdx] = useState(0);
  const lights = config ?? defaultConfig;
  const handleClick = () => {
    setCurIdx((curIdx + 1) % 3);
  };
  return (
    <>
      {lights.map((item, idx) => (
        <TrafficLightItem on={idx === curIdx} onClick={handleClick} {...item} />
      ))}
    </>
  );
}

export default () => <TrafficLight />;
