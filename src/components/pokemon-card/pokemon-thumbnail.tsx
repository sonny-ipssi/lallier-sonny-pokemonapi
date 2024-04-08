import { css } from '@emotion/react';
import styled from '@emotion/styled';
import SpinLoader from 'components/loader/sprin-loader';
import { styleVars } from 'globalStyles';
import { useState } from 'react';

const PokemonThumbnailWrapper = styled.div({
  position: 'relative',
  height: 'auto',
  maxWidth: '100%',
});

const PokemonThumbnailStyle = styled.img({
  height: '100%',
  maxWidth: '100%',
});

const PokemonThumbnailLoader = styled.div({
  zIndex: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: styleVars.borderRadius,
  transform: 'translate(-50%, -50%)',
  '&:hover': {
    backgoundColor: styleVars.blue,
  },
});

export default function PokemonThumbnail(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  {},
) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <PokemonThumbnailWrapper>
      <PokemonThumbnailStyle
        onLoad={() => setLoaded(true)}
        {...props}
        css={[!loaded && css({ opacity: 0 })]}
      />
      {!loaded && (
        <PokemonThumbnailLoader
          style={{
            height: props.height,
            width: props.width,
          }}
        >
          <SpinLoader />
        </PokemonThumbnailLoader>
      )}
    </PokemonThumbnailWrapper>
  );
}
