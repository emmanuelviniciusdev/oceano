export type RenderMiddlewareAdditionalPropsType = {
  /**
   * The title to be rendered with page.
   */
  pageTitle?: string;

  /**
   * It indicates if a route is a private route or not.
   */
  isPrivate?: boolean;

  /**
   * It indicates if a route is blocked from an authenticated user.
   */
  isBlockedFromAuthenticatedUsers?: boolean;
};
