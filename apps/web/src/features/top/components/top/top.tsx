type Props = {
  isLoading: boolean;
};
export const Top = ({ isLoading }: Props) => {
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>Top Page</div>
    </div>
  );
};
