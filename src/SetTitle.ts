import { CaseDescriptorEntity } from "./CaseDescriptorEntity";
import { ContractEntity } from "./ContractEntity";
import { SutType } from "./SutType";


export class SetTitle<T extends SutType> extends ContractEntity<T>{
    setTitle(
        explanation: string
    ) {
        this.explanation = explanation;
        this.cases[""] = new CaseDescriptorEntity();
        return this
    }

}
