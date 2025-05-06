import { FC } from 'react';
import { Button } from '../SharedUI/Button';

type Props = {
  primaryLabel: string;
  onPrimaryClick: () => void;
  disablePrimary?: boolean;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  disableSecondary?: boolean;
};

export const ActionButtons: FC<Props> = ({
  primaryLabel,
  onPrimaryClick,
  disablePrimary,
  secondaryLabel,
  onSecondaryClick,
  disableSecondary,
}) => (
  <div className="mt-4 flex justify-start gap-4">
    {secondaryLabel && onSecondaryClick && (
      <Button
        variant="secondary"
        onClick={onSecondaryClick}
        disabled={disableSecondary}
        className={disableSecondary ? 'opacity-25' : ''}
      >
        {secondaryLabel}
      </Button>
    )}
    <Button
      variant="primary"
      onClick={onPrimaryClick}
      disabled={disablePrimary}
      className={`text-white ${disablePrimary ? 'opacity-25' : ''}`}
    >
      {primaryLabel}
    </Button>
  </div>
);
