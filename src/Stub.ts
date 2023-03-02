import { mockFn } from "jest-mock-extended";
import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class Stub<T extends SutType> extends ShallEntity<T> {
    stub(): T {
        const stub = mockFn<T>();
        stub.calledWith(...this.parameters).mockReturnValue(this.returnValue);
        return stub;
    }
}
