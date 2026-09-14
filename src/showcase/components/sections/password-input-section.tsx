import { PasswordInput } from '../../../design-system/password-input';

export function PasswordInputSection() {
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <PasswordInput defaultValue="password" />
      <div className="font-mono text-[11px] text-muted-foreground">
        Input + trailing visibility toggle (click the eye)
      </div>
    </div>
  );
}
