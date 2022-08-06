import { GenericContainer, StartedTestContainer } from "testcontainers";
import { FetchDacheClient } from ".";
import DacheClient from "./client/interface";

describe("Test FetchDacheClient", () => {
  let dacheContainer: StartedTestContainer;
  let dacheClient: DacheClient;

  beforeAll(async () => {
    dacheContainer = await new GenericContainer("tombailey256/dache:0.2.0")
      .withEnv("DURABILITY_ENGINE", "memory")
      .withEnv("HTTP_PORT", "8080")
      .withExposedPorts(8080)
      .start();

  });

  beforeEach(() => {
    dacheClient = new FetchDacheClient(
      `http://${dacheContainer.getHost()}:${dacheContainer.getMappedPort(8080)}`
    );
  });

  afterAll(async () => {
    await dacheContainer.stop();
  });

  it("should set and get entries", async () => {
    await dacheClient.set("set-test-key", "test");
    const entry = await dacheClient.get("set-test-key");
    expect(entry).toEqual({
      key: "set-test-key",
      value: "test",
    });
  });

  it("should return null if entry is missing", async () => {
    const entry = await dacheClient.get("missing");
    expect(entry).toBeNull();
  });

  it("should delete entries", async () => {
    await dacheClient.set("delete-test-key", "test");
    const afterSetEntry = await dacheClient.get("delete-test-key");
    expect(afterSetEntry).not.toBeNull();

    await dacheClient.delete("delete-test-key");

    const afterDeleteEntry = await dacheClient.get("delete-test-key");
    expect(afterDeleteEntry).toBeNull();
  });
});
