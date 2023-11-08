import { NotchedContainer } from '..';

export const NotchedContainerExample = () => {
  return (
    <NotchedContainer
      style={{
        width: '80vw',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#ffefd5',
        boxShadow: 'inset 0 0 20px 20px #deb887',
      }}
    >
      <div>Notched Container</div>
    </NotchedContainer>
  );
};
