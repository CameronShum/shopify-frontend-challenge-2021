import React, { useState } from 'react';
import styled from 'styled-components/macro';
import firebase from 'firebase/app';
import { useFirebaseDispatch, useUidDispatch } from './FirebaseProvider';

/**
 * The top right Sign In and Sign Out button. Dispatches Uid changes
 */
const SignInButton = () => {
  const [uid, setUid] = useState('');
  const dispatchUid = useUidDispatch();
  const dispatchNominations = useFirebaseDispatch();

  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          dispatchUid(result.user.uid);
          setUid(result.user.uid || 'Signed In');
        }
      });
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatchUid('');
    setUid('');
    dispatchNominations({ type: 'signOut' });
  };

  return (
    <ButtonContainer onClick={uid ? handleSignOut : handleSignIn}>
      {uid ? 'Sign Out' : 'Sign In'}
    </ButtonContainer>
  );
};

export default SignInButton;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;

  background-color: #00897B;
  color: white;

  @media (max-width: 600px) {
    top: 5px;
    right: 5px;
    padding: 5px 20px;
  }
`;
