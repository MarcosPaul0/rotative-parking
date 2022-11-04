import { AppRoutes } from "@enums/appRoutes.enum";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      [AppRoutes.HOME]: undefined;
      [AppRoutes.REGISTER]: undefined;
      [AppRoutes.STORE]: undefined;
      [AppRoutes.USER]: undefined;
      [AppRoutes.VEHICLES]: undefined;
      [AppRoutes.LOGIN]: undefined;
      [AppRoutes.TAB_ROUTER]: undefined;
    }
  }
}