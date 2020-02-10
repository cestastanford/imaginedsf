import React, { useContext } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import PreviousLocationContext from './PreviousLocationContext';
import facebookIcon from '../../img/facebook-icon.png';
import twitterIcon from '../../img/twitter-icon.png';


export default function ShareModal() {
  const previousLocation = useContext(PreviousLocationContext);

  const shareUrl = `${window.location.origin}${previousLocation.pathname}${previousLocation.hash}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;

  return (
    <Modal title="Share current view" isSideModal>
      <StyledSocialLinks>
        <StyledSocialLink href={facebookShareUrl} target="_share">
          <img src={facebookIcon} alt="Facebook" />
          Facebook
        </StyledSocialLink>
        <StyledSocialLink href={twitterShareUrl} target="_share">
          <img src={twitterIcon} alt="Twitter" />
          Twitter
        </StyledSocialLink>
      </StyledSocialLinks>
    </Modal>
  );
}

const StyledSocialLinks = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5em;
`;

const StyledSocialLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75em;
  font-weight: bold;
  color: initial;
  transition: opacity ${({ theme }) => theme.transitionDurations.linkHover};

  &:hover {
    opacity: ${({ theme }) => theme.opacities.linkHover};
  }

  img {
    width: 4em;
  }
`;
