export interface ServerResponseInterface<T> {
  result: ResultInterface;
  data: T;
}

export interface ResultInterface {
  code: number | string;
  message: string;
}
