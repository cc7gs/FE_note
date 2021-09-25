import React from 'react';

interface Action<T> {
  type: string;
  payload?: T;
}

class EffectModule {
  count = 1;
  message = 'hello!';

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: 'delay',
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: 'set-message',
    };
  }
}

type Connected = {
  delay: (input: number) => Action<string>;
  setMessage: (action: Date) => Action<number>;
};

const connect: Connect<EffectModule> = () => ({
  delay: () => ({
    type: 'delay',
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: 'set-message',
    payload: input.getMilliseconds(),
  }),
});

export const connected: Connected = connect(new EffectModule());

// 解答:

type PickMethodKeys<M> = {
  [k in keyof M]: M[k] extends (...args: any[]) => any ? k : never;
}[keyof M];

type Connect<T> = (m: T) => {
  [key in PickMethodKeys<T>]: T[key] extends (
    input: Promise<infer R>,
  ) => Promise<Action<infer U>>
    ? (input: R) => Action<U>
    : T[key] extends (input: Action<infer R>) => Action<infer U>
    ? (input: R) => Action<U>
    : never;
};

export default () => <>展开source面板 查看答案✌️</>;
