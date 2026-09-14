import { useEffect, useState } from 'react';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { useTheme } from '../../design-system/theme-provider';

/** Whether `.dark` is currently applied to `<html>`, kept in sync via a
 * MutationObserver rather than re-deriving mode/matchMedia ourselves —
 * ThemeProvider already owns that resolution (including staying in sync
 * when mode is "system" and the OS preference changes); this just
 * observes the class it applies. Re-subscribes on `mode` change so a
 * manual light/dark switch is picked up immediately too. */
function useIsDark(): boolean {
  const { mode } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const compute = () => setIsDark(root.classList.contains('dark'));
    compute();
    const observer = new MutationObserver(compute);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [mode]);

  return isDark;
}

/** A syntax-highlighted code sample block — showcase-only, not shipped in
 * the package. Uses prism-react-renderer's stock VS Code Dark+/Light+
 * themes (real, familiar syntax colors, not this design system's own
 * tokens) so a code sample reads exactly like it would in an editor,
 * switching with the page's actual light/dark state. Supports whichever
 * language a given snippet actually is (css, markup/html, jsx, tsx,
 * bash, ...), and scrolls horizontally inside its own container so a
 * long line never widens the page. */
export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: Language }) {
  const theme = useIsDark() ? themes.vsDark : themes.vsLight;

  return (
    <Highlight theme={theme} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} border-border overflow-x-auto rounded-md border p-4 text-sm`} style={style}>
          {tokens.map((line, i) => {
            const { key: lineKey, ...lineProps } = getLineProps({ line, key: i });
            return (
              <div key={lineKey as React.Key} {...lineProps}>
                {line.map((token, key) => {
                  const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                  return <span key={tokenKey as React.Key} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
