import React from 'react';
import { motion } from 'framer-motion';

// Styles
import {
  StyledOceanoCard,
  WrapperActions,
  WrapperIcon,
  WrapperText,
} from './styles';

// Icons
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

// Types
import { OceanoCardType } from '../../types-and-interfaces/components/OceanoCard.types';

const defaultIconsForThemes = {
  clownfish: <InfoIcon fontSize="inherit" />,
  warning: <WarningIcon fontSize="inherit" />,
  error: <ErrorIcon fontSize="inherit" />,
};

const OceanoCard: React.FunctionComponent<OceanoCardType> = ({
  icon,
  text,
  theme = 'clownfish',
  children,
}) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { y: 100 },
          animate: { y: 0 },
        }}
      >
        <StyledOceanoCard oceanoCardTheme={theme}>
          <WrapperIcon>
            {icon ? icon : defaultIconsForThemes[theme]}
          </WrapperIcon>

          <WrapperText oceanoCardTheme={theme}>
            <p>{text}</p>
          </WrapperText>

          <WrapperActions oceanoCardTheme={theme}>{children}</WrapperActions>
        </StyledOceanoCard>
      </motion.div>
    </>
  );
};

export default OceanoCard;
