import React from 'react';
import ActionCard, {actionCardDefaultProps, ActionCardProps} from "./ActionCard";

const defaultProps = {
    ...actionCardDefaultProps,
    onClick: () => {},
}

type ActionButtonProps = ActionCardProps & {
    onClick?: () => void;
} & typeof defaultProps;

const ActionButton = ({ onClick, actionText, rightIcon, leftIcon }: ActionButtonProps) => {
    const cardProps = {
        actionText,
        rightIcon,
        leftIcon
    }
    return (
        <div
            className="action"
            onKeyPress={() => null}
            role="button"
            tabIndex={0}
            onClick={onClick}
        >
            <ActionCard
                {...cardProps}
            />
        </div>
    );
};

ActionButton.defaultProps = defaultProps;

export default ActionButton;
