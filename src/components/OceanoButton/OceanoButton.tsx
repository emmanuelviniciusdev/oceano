import React from 'react';
import { OceanoButton as StyledOceanoButton } from './styles';

// Styles
import { OceanoBubbleLoading } from '../../styles/general';

// Types
import { OceanoButtonType } from '../../types-and-interfaces/components/OceanButton.types';

const OceanoButton: React.FunctionComponent<
  OceanoButtonType & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, icon, theme = 'purple', isLoading, ...props }) => {
  return (
    <>
      <StyledOceanoButton {...props} styledTheme={theme}>
        <div className="button-content" data-testid="ocean-button-content">
          {/* Workaround to solve problems related to position when there is no icon defined */}
          {!icon ? (
            <>
              {!isLoading ? (
                <div className="no-icon" />
              ) : (
                <div className="icon">
                  <OceanoBubbleLoading
                    className="oceano-bubble-loading"
                    width={24}
                    height={24}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="icon">
              {isLoading ? (
                <OceanoBubbleLoading
                  className="oceano-bubble-loading"
                  width={24}
                  height={24}
                />
              ) : (
                icon
              )}
            </div>
          )}

          <div className="text">{text}</div>
        </div>
      </StyledOceanoButton>
    </>
  );
};

export default OceanoButton;
