export type MobileMenuType = {
  /**
   * Triggered when the close button is pressed
   */
  onClose: () => void;

  /**
   * Triggered when the create note button is pressed
   */
  onCreateNote: () => void;

  /**
   * Triggered when the sign out button is pressed
   */
  onSignOut: () => void;
};
