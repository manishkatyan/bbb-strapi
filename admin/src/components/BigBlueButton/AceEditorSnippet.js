import AceEditor from 'react-ace';
import React from 'react';
import PropTypes from 'prop-types';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const AceEditorSnippet = ({ height, value }) => {
  return (
    <AceEditor
      placeholder="BigBlueButton Settings"
      mode="javascript"
      theme="github"
      name="demoCode"
      fontSize={18}
      showPrintMargin
      showGutter={false}
      highlightActiveLine={false}
      readOnly
      height={height}
      width="680px"
      value={value}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: false,
        tabSize: 2,
      }}
    />
  );
};

export default AceEditorSnippet;

AceEditorSnippet.propTypes = {
  value: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
