import React, { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Styles
import { StyledOceanoContextMenu, Content } from './styles';

// Types
import { OceanoContextMenuType } from '../../types-and-interfaces/components/OceanoContextMenu.types';

// Custom hooks
import useContextMenu from '../../hooks/useContextMenu';

const OceanoContextMenu: React.FunctionComponent<OceanoContextMenuType> = ({
  componentRef,
  children,
}) => {
  const uniqueId = useRef(`oceanocontextmenu-id-${uuidv4()}`);

  const { showContextMenu, xPosition, yPosition } = useContextMenu(
    componentRef,
    uniqueId.current
  );

  return (
    <>
      {showContextMenu && (
        <StyledOceanoContextMenu
          id={uniqueId.current}
          data-testid="oceano-contextmenu"
          xPosition={xPosition}
          yPosition={yPosition}
        >
          <Content>{children}</Content>
        </StyledOceanoContextMenu>
      )}
    </>
  );
};

export default OceanoContextMenu;
