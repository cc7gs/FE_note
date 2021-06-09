import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import type { LightConfig } from './data';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
interface ILightItem {
  color?: string;
  isFlash?: boolean;
}
interface LightConfigItem extends LightConfig {
  on: boolean;
  onClick: () => void;
}

const defaultLight = {
  color: '#000',
  isFlash: false,
};

const TrafficLightItem = ({ on, onClick, ...props }: LightConfigItem) => {
  const [lightConfig, setLightConfig] = useState<ILightItem>();

  useEffect(() => {
    if (on) {
      lightState(props);
    }
  }, [on]);

  async function lightState({
    color,
    duration,
    twinkleDuration = 0,
  }: LightConfig) {
    setLightConfig({ color, isFlash: false });
    await sleep(duration - twinkleDuration);
    if (twinkleDuration) {
      setLightConfig((config) => ({ ...config, isFlash: true }));
      await sleep(twinkleDuration);
    }
    setLightConfig(defaultLight);
    onClick();
  }

  return (
    <div
      className={classNames(styles.light, {
        flash: lightConfig?.isFlash,
      })}
      style={{ backgroundColor: lightConfig?.color }}
    />
  );
};

export default TrafficLightItem;
