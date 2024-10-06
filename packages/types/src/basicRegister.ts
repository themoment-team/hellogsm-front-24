import { z } from "zod";

import { basicRegisterSchema } from "shared";

export type basicRegisterType = z.infer<typeof basicRegisterSchema>;
