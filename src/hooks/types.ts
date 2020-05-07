export type Hook<R, T extends any[] = []> = (...args: T) => R;
export type UseState = <S>(defaultState: S) => [S, S];
export type CallBackHook<
    B extends any[] = [],
    T extends any[] = [],
    R = void
> = (...args: T) => (...args: B) => R;
