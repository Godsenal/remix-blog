import { User } from "@prisma/client";

export type TOutletContext = {
  user: User | null;
};
