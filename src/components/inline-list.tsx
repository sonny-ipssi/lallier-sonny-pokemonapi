import { Theme } from '@emotion/react';
import { Interpolation } from '@emotion/serialize';
import { Children, ReactNode } from 'react';

export default function InlineList({
  children,
  childCss,
}: {
  children: ReactNode | ReactNode[];
  css?: string;
  childCss?: Interpolation<Theme>;
}) {
  return (
    <ul
      css={[
        {
          display: 'inline-flex',
          gap: '0.75em',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        },
      ]}
    >
      {Children.map(
        children,
        (child, index) =>
          child && (
            <>
              {index !== 0 && (
                <li css={{ color: '#aaa', fontSize: '.8em' }}>•</li>
              )}
              <li
                key={child.toString()}
                css={childCss}
              >
                {child}
              </li>
            </>
          ),
      )}
    </ul>
  );
}
