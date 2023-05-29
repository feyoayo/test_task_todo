type Props = {
  when: boolean;
  children: any;
};
const ShowElement = ({ when, children }: Props) => {
  if (when) return children;
  return null;
};

export default ShowElement;
