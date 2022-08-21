import { useEffect, useState } from 'react';
import bundle from '../bundler';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <div>
      <Resizable direction='vertical'>
        <div style={{ height: 'calc(100% - 10px)', display: 'flex' }}>
          <Resizable direction='horizontal'>
            <CodeEditor
              initialValue={cell.content}
              onChange={(value) => updateCell(cell.id, value)}
            />
          </Resizable>
          <Preview code={code} err={err} />
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;
