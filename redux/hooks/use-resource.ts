import memoizeOne from 'memoize-one';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AsyncStatus, AsyncValue, CombinedState } from '../types';

export interface SuspenseResource<T> {
  read: () => T;
}

function wrapPromise<T>(promise: Promise<T>): SuspenseResource<T> {
    let status = 'pending';
    let response: T;

    const suspender = promise.then(
      res => {
        status = 'success';
        response = res;
      },
      err => {
        status = 'error';
        response = err;
      },
    );

    const read = () => {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw response;
        default:
          return response;
      }
    };

    return { read };
  }

class Deferred<T> {
  private promise: Promise<T>;

  constructor() {
    this.promise = new Promise<T>((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }

  // tslint:disable-next-line: no-empty
  public resolve(value: T) {}
  // tslint:disable-next-line: no-empty
  public reject(error: Error | null) {}

  public toPromise() {
    return this.promise;
  }
}

function createDeferred<T>(id: number) {
  return new Deferred<T>();
}

const memoizedCreateDeferred = memoizeOne(createDeferred);

function createResource<T>(deferred: Deferred<T>) {
  return wrapPromise(deferred.toPromise());
}

const memoizedCreateResource = memoizeOne(createResource);

type AsyncValueSelector<T> = (state: CombinedState) => AsyncValue<T>;

function useResource<T>(selector: AsyncValueSelector<T>): SuspenseResource<T> | null {
    const currentValue = useSelector(selector);
    const deferred = memoizedCreateDeferred(currentValue.id);
    const resource = memoizedCreateResource(deferred);

    if (currentValue.status === AsyncStatus.Complete) {
      deferred.resolve(currentValue.value);
    } else if (currentValue.status === AsyncStatus.Error) {
        deferred.reject(currentValue.error);
    }

    if (currentValue.status === AsyncStatus.Uninitialized) {
      return null;
    }
    return resource as SuspenseResource<T>;
}

export default useResource;
