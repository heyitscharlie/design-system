import { ColorSwatch } from '../color-swatch';
import { colorTokens } from '../../content';

export function ColorSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {colorTokens.map((token) => (
        <ColorSwatch key={token.name} token={token} />
      ))}
    </div>
  );
}
