import DacheClient from "./interface";
import DacheEntry from "../entity/entry";

export default class FetchDacheClient implements DacheClient {
  private readonly host: string;

  constructor(host: string) {
    this.host = host;
  }

  async get(key: string): Promise<DacheEntry | null> {
    const response = await fetch(`${this.host}/dache/${key}`);
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error(`Expected 200 but got ${response.status}`);
    }
  }

  async set(key: string, value: string, expiry?: Date): Promise<void> {
    const response = await fetch(`${this.host}/dache/${key}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
        expiry: expiry ? expiry.getTime() / 1000 : undefined,
      }),
    });
    if (response.status !== 204) {
      throw new Error(`Expected 204 but got ${response.status}`);
    }
  }

  async delete(key: string): Promise<void> {
    const response = await fetch(`${this.host}/dache/${key}`, {
      method: "delete",
    });
    if (response.status !== 204) {
      throw new Error(`Expected 204 but got ${response.status}`);
    }
  }
}
