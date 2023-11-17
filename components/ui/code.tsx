import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ language, value }: { language: string, value: string, }) {
  return (
    <SyntaxHighlighter language={language} style={darcula}>
      {value}
    </SyntaxHighlighter>
  )
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}