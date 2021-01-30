export enum AsyncStatus {
  INITIAL = "INITIAL",
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED"
}

export interface AsyncState<T> {
  status: AsyncStatus;
  data?: T;
  error?: unknown;
}

export function createAsyncInitial<T>(
  data?: T,
  error?: unknown
): AsyncState<T> {
  return {
    status: AsyncStatus.INITIAL,
    data,
    error
  };
}

export function createAsyncPending<T>(
  data?: T,
  error?: unknown
): AsyncState<T> {
  return {
    status: AsyncStatus.PENDING,
    data,
    error
  };
}

export function createAsyncFulfilled<T>(
  data: T,
  error?: unknown
): AsyncState<T> {
  return {
    status: AsyncStatus.FULFILLED,
    data,
    error
  };
}

export function createAsyncRejected<T>(
  error: unknown,
  data?: T
): AsyncState<T> {
  return {
    status: AsyncStatus.REJECTED,
    data,
    error
  };
}
