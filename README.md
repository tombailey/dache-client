# dache-client

## Introduction

A client for [dache](https://github.com/tombailey/dache).

## Getting started

```sh
npm install --save dache-client
```

```ts
import { FetchDacheClient } from "dache-client";

const dacheClient = new FetchDacheClient("http://localhost:8080");

const key = "example";
await dacheClient.set(key, "hello world");

let entry = await dacheClient.get(key);
// "hello world"
console.log(entry?.value);

await dacheClient.delete(key);
entry = await dacheClient.get(key);
// null
console.log(entry);
```
