import DacheEntry from "../entity/entry";

type DacheClient = {
  get(key: string): Promise<DacheEntry | null>;
  set(key: string, value: string, expiry?: Date): Promise<void>;
  delete(key: string): Promise<void>;
};

export default DacheClient;
