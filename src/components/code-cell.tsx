import { useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <Resizable direction='vertical'>
        <div style={{ height: '100%', display: 'flex' }}>
          <Resizable direction='horizontal'>
            <CodeEditor initialValue='const a = 1;' onChange={(value) => setInput(value)} />
          </Resizable>
          <Preview code={code} err={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;