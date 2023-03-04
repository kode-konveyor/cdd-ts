
export interface EntryEntity {
    getter: () => number;
}

export interface FooEntity {
    entries: Record<string, EntryEntity>;
    modifier: () => void;
}
