import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";

export class SetTitle<T extends SutType> extends ContractEntity<T> {
    public setTitle(
        explanation: string
    ): this {
        this.explanation = explanation;
        this.cases[""] = new CaseDescriptorEntity();
        return this;
    }
}
