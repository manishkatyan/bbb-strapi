/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from 'prop-types';

import BigBlueButton from "../BigBlueButton/BigBlueButton";

import { getClass } from '../Utils/apiCalls'
const HomePage = () => {
  return (
    <div>
      <BigBlueButton />
    </div>
  );
};

export default memo(HomePage);
