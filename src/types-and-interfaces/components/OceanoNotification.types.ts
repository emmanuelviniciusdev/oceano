import { SvgIconProps } from '@material-ui/core';

export type TypesOfNotificationType = 'clownfish' | 'warning' | 'error';

export type OceanoNotificationType = {
  type: TypesOfNotificationType;
  icon?: React.ReactElement<SvgIconProps>;
  timeout?: number;
  children: string;
  onClose?: () => void;
};
