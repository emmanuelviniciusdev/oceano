import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// testes porpuses
import DeleteForever from '@material-ui/icons/DeleteForever';
import TextFields from '@material-ui/icons/TextFields';
import OceanoButton from '../OceanoButton/OceanoButton';

// Styles
import { StyledOceanoContextMenu, Content } from './styles';

// Types
import { OceanoContextMenuType } from '../../types-and-interfaces/components/OceanoContextMenu.types';

// Custom hooks
import useContextMenu from '../../hooks/useContextMenu';

const OceanoContextMenu: React.FunctionComponent<OceanoContextMenuType> = ({
  componentRef,
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
          xPosition={xPosition}
          yPosition={yPosition}
        >
          <Content>
            <OceanoButton
              theme="transparent"
              icon={<TextFields />}
              text="renomear nota"
            />
            <OceanoButton
              theme="transparent"
              icon={<DeleteForever />}
              text="deletar nota"
            />
          </Content>
        </StyledOceanoContextMenu>
      )}
    </>
  );
};

export default OceanoContextMenu;
