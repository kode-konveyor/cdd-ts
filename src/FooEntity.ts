import { EntryEntity } from "./EntryEntity";

export interface FooEntity {
    entries: Record<string, EntryEntity>;
    modifier: () => void;
}
