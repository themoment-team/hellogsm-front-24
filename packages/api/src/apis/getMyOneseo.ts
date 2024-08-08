import { oneseoUrl } from "api/libs";
import { cookies } from "next/headers";
import { GetMyOneseoType } from "types";

export const getMyOneseo = async (): Promise<GetMyOneseoType | null> => {
  const accessToken = cookies().get("accessToken")?.value;

  const response = await fetch(new URL(`/api${oneseoUrl.getMyOneseo()}}`), {
    method: "GET",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });
  const myOneseo: GetMyOneseoType = await response.json();

  if (response.status === 404) return null;

  return myOneseo;
};
