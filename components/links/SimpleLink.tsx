interface simpleLinkProps {
  href: string;
  text: string;
  target?: string;
}
const SimpleLink: React.FC<simpleLinkProps> = ({ href, text, target }) => (
  <a href={href} target={target} rel="noreferrer">
    {text}
  </a>
);

export default SimpleLink;
