import React, { useContext, useRef } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import PreviousLocationContext from './PreviousLocationContext';
import facebookIcon from '../../img/facebook-icon.png';
import twitterIcon from '../../img/twitter-icon.png';


export default function ShareModal() {
  const textAreaRef = useRef();
  const previousLocation = useContext(PreviousLocationContext);

  const shareUrl = `${window.location.origin}${previousLocation.pathname}${previousLocation.hash}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
  const copyUrl = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
  };

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
      <StyledSeparator>-Or-</StyledSeparator>
      <StyledCopyUrl>
        Link to share
        <StyledTextarea
          className="textarea has-fixed-size"
          ref={textAreaRef}
          value={shareUrl}
          readOnly
        />
        <StyledCopyButton onClick={copyUrl}>Copy Link</StyledCopyButton>
      </StyledCopyUrl>
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
    margin-bottom: 0.25em;
  }
`;

const StyledSeparator = styled.div`
  font-weight: lighter;
  color: #555;
  text-align: center;
  text-transform: uppercase;
`;

const StyledCopyUrl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em 0;
  font-size: 0.85em;
  font-weight: bold;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 25em;
  padding: 0.75em 1em;
  margin: 0.5em 0;
  font-size: 0.9em;
  font-style: italic;
  color: #999;
`;

const StyledCopyButton = styled.a`
  padding: 0.35em 0.85em;
  margin-top: 0.5em;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  background-color: #bbb;
  border-radius: 3px;
  box-shadow: 0 0 4px inset rgba(0, 0, 0, 0.25);
  transition: background-color 0.15s;

  &:hover {
    color: #fff;
    background-color: #aaa;
  }

  &:active {
    background-color: #999;
    transition: none;
  }
`;
