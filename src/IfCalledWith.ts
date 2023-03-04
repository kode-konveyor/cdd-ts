import { RunDescriptorEntity } from "./RunDescriptorEntity";
import { ShallEntity } from "./ShallEntity";
import { SutType } from "./SutType";

export class IfCalledWith<T extends SutType> extends ShallEntity<T> {

    ifCalledWith(...parameters: Parameters<T>):this {
        if(this.currentRun) {
            const currentCase = (this.currentCase)? this.currentCase : "";
            this.cases[currentCase].runs.push(this.currentRun)
        }
        this.currentRun = new RunDescriptorEntity()
        this.currentRun.parameters = parameters;
        return this;
    }

}
