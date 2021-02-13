type Opaque<K, T> = T & { __TYPE__: K };

type Primitive = string | number | boolean | null | undefined | symbol;

declare module 'recoil' {
  function useRecoilState<T>(recoilValue: RecoilValue<T>): MemoizedStateTuple<T>;
  function useRecoilValue<T>(recoilValue: RecoilValue<T>): MemoizedStateTuple<T>[0];
  function useSetRecoilState<T>(recoilValue: RecoilValue<T>): MemoizedStateTuple<T>[1];
  function useRecoilValueLoadable<T>(recoilValue: RecoilValue<T>): Memoized<Loadable<T>>;
}

declare global {
  type MemoizedStateTuple<T> = [Memoized<T>, Memoized<React.Dispatch<React.SetStateAction<T>>>];

  type Memoized<T> = Opaque<'Memoized', T>;

  type MemoizedProps<T extends object> = {
    [K in keyof T]: T[K] extends Primitive ? T[K] : Memoized<T[K]>;
  };
  type MemoizedFC<T extends object> = React.FC<MemoizedProps<T>>;

  // tslint:disable-next-line: no-any
  type Dependency = Memoized<object | ((...args: any[]) => any)> | Primitive;
  type MemoizedDependencyList = ReadonlyArray<Dependency>;

  namespace React {
    function useMemo<T>(m: () => T, deps: MemoizedDependencyList): Memoized<T>;
    // tslint:disable-next-line: no-any
    function useCallback<T extends (...args: any) => any>(
      cb: T,
      deps: MemoizedDependencyList,
    ): Memoized<T>;
    function useEffect<T extends 'strict'>(
      effect: () => void | (() => void | undefined),
      deps: MemoizedDependencyList,
    ): void;
    function memo<T extends object>(component: React.FC<T>): MemoizedFC<T>;
    function useState<T>(initialState: T | (() => T)): MemoizedStateTuple<T>;
  }
}

interface StreamEvent {
  timestamp: number;
  type: string;
  value?: string | number;
}

interface OutputStream {
  name: string;
  id: string;
  events: StreamEvent[];
  pipes: string[];
  inputs: string[];
  isTopLevel: boolean;
}

export type FiddleOutput = OutputStream[];
