import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

// Styles
import {
  NotificationIcon,
  NotificationText,
  StyledNotification,
} from './styles';

// Types
import { OceanoNotificationType } from '../../types-and-interfaces/components/OceanoNotification.types';

const notificationDefaultIcons = {
  clownfish: <ThumbUpIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

const OceanoNotification: React.FunctionComponent<OceanoNotificationType> = ({
  type,
  icon,
  timeout = 4000,
  onClose,
  children,
}) => {
  const triggerClose = useCallback(() => {
    setTimeout(() => {
      if (onClose) onClose();
    }, timeout);
  }, [onClose, timeout]);

  useEffect(() => triggerClose(), [triggerClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <StyledNotification type={type}>
          <NotificationIcon type={type}>
            {icon ? icon : notificationDefaultIcons[type]}
          </NotificationIcon>
          <NotificationText type={type}>{children}</NotificationText>
        </StyledNotification>
      </motion.div>
    </>
  );
};

export default OceanoNotification;
