export type OceanoModalType = {
  title: string;
  text: string;
  /**
   * Function to be called when modal is going to be closed
   */
  onClose?: () => void;
  /**
   * The action elements
   */
  children?: React.ReactNode;
};
