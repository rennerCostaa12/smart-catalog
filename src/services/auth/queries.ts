import { queryOptions } from "@tanstack/react-query";
import { authService } from ".";

export const userDataQueryKeys = {
  all: ["user-data"],
  detail: (slug: string) => [...userDataQueryKeys.all, slug],
};

export function authMeClientQueryOptions(slug: string) {
  return queryOptions({
    queryKey: userDataQueryKeys.detail(slug),
    queryFn: async () => {
      const responseUser = await authService.me();
      const authenticatedUser = responseUser.data;

      return authenticatedUser;
    },
  });
}
