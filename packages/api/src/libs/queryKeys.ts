import { GraduationType } from "types";

export const exampleQueryKeys = {
  getExampleData: () => ["example"],
} as const;

export const oneseoQueryKeys = {
  postTempStorage: () => ["post", "temp", "oneseo", "storage"],
  postMyOneseo: () => ["post", "my", "oneseo"],
  postMockScore: (type: GraduationType) => ["mock", "oneseo", "score", type],
} as const;
