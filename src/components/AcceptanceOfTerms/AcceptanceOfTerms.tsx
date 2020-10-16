import React from 'react';

// Icons
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

// Components
import OceanoButton from '../OceanoButton/OceanoButton';

// Styles
import {
  WrapperTerms,
  Background,
  Content,
  WrapperContent,
  ActionContent,
  ButtonClose,
} from './styles';

const AcceptanceOfTerms = () => {
  return (
    <>
      <Background>
        <ButtonClose>
          <CloseIcon fontSize="inherit" />
        </ButtonClose>

        <WrapperContent>
          <Content>
            <h1>Política de Privacidade</h1>

            <WrapperTerms>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sed nunc viverra, consequat sapien sed, pulvinar felis. Sed quam
                orci, molestie sed ligula ac, vestibulum sagittis diam. Aliquam
                vitae pharetra ipsum. Etiam luctus tellus vel mi ultrices, et
                egestas sapien venenatis. Praesent at mi varius, egestas massa
                vel, finibus mauris. Donec molestie tortor dolor, non dignissim
                diam auctor id. Pellentesque consectetur rutrum orci.
                Suspendisse potenti. Donec non ultricies ante, in mollis magna.
                Aliquam vitae dapibus leo.
              </p>
              <p>
                Nulla scelerisque urna vitae dignissim maximus. Pellentesque non
                nisl et odio ultrices convallis. Vivamus volutpat congue
                imperdiet. Phasellus venenatis elit sed erat auctor, at cursus
                quam aliquet. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Quisque rutrum, augue
                vitae facilisis tincidunt, nunc libero lacinia ligula, at
                tincidunt felis nisl vitae neque. Mauris id egestas metus,
                blandit pharetra nunc. Praesent consequat, orci at sagittis
                dignissim, nunc sapien cursus nisl, non volutpat arcu ipsum id
                orci. Proin bibendum elit tellus. Pellentesque non tortor in
                enim pulvinar porta. Aenean risus tortor, mattis rhoncus est
                rhoncus, semper tristique quam. Mauris at convallis libero.
                Etiam a est tempus, rhoncus nisi id, dictum lorem. Suspendisse
                orci eros, auctor at sodales ut, efficitur a dui.
              </p>
              <p>
                Curabitur ut odio at ex laoreet faucibus. Sed congue bibendum
                rhoncus. Pellentesque sapien nibh, tempor vel arcu eget,
                molestie suscipit magna. Curabitur lobortis turpis at mollis
                volutpat. Aenean at augue lobortis, tincidunt quam quis,
                accumsan diam. Phasellus eget ex vitae lorem commodo feugiat.
                Etiam nisi mi, ultrices ut sem eget, facilisis mattis mauris.
                Nam facilisis justo nibh. Fusce vitae enim nibh. Quisque et
                bibendum nibh. Cras varius orci ultricies, mollis nunc vitae,
                gravida augue. Curabitur id tempor lorem. Praesent lacinia neque
                ut pharetra hendrerit.
              </p>
            </WrapperTerms>

            <ActionContent>
              <div className="wrapper-checkbox-acceptance">
                <input type="checkbox" id="checkbox-acceptance" />
                <label htmlFor="checkbox-acceptance">
                  li e aceito os <b>termos de uso</b> e a{' '}
                  <b>política de privacidade</b>
                </label>
              </div>
              <OceanoButton icon={<ArrowBackIcon />} text="voltar" />
              <OceanoButton icon={<ArrowForwardIcon />} text="próximo" />
              <OceanoButton text="criar conta com a microsoft" />
            </ActionContent>
          </Content>
        </WrapperContent>
      </Background>
    </>
  );
};

export default AcceptanceOfTerms;
