import React, { ChangeEvent } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';

interface CodeEditorProps {
  value: string;
  onChange: (value: string, event?: ChangeEvent<any>) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }: CodeEditorProps) => {
    return (
    <AceEditor
      mode="sql"
      theme="monokai"
      name="code-editor"
      fontSize={14}
      width="100%"
      height="300px"
      editorProps={{ $blockScrolling: true }}
      showPrintMargin={false}
      value={value}
      onChange={onChange}
    />
  );
};

export default CodeEditor;