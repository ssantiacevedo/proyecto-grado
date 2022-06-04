import React from 'react';
import styled from 'styled-components';
import { palette } from '../theme/palette';
import { ToastContainer } from 'react-toastify';

export const WrappedToastContainer = ({ ...rest }) => (
  <ToastContainer
    position={'top-right'}
    autoClose={2000}
    hideProgressBar={true}
    closeOnClick={true}
    pauseOnHover={true}
    draggable={false}
    {...rest}
  />
);

export default styled(WrappedToastContainer)`
  /* .Toastify__toast  */

  .Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: 5px !important;
  }
  .Toastify__toast--error {
    background-color: ${palette.alpha500Red} !important;
    color: ${palette.white};
  }
  .Toastify__toast--success {
    background: ${palette.gama800Success} !important;
    background-color: ${palette.gama800Success} !important;
  }
  .Toastify__progress-bar {
  }
`;
