import React from 'react';
import {IonIcon} from "@ionic/react";

export const actionCardDefaultProps = {
    leftIcon: "",
    actionText: "",
    rightIcon: "",
}

export type ActionCardProps = {
    leftIcon?: string;
    actionText?: any;
    rightIcon?: string
} & typeof actionCardDefaultProps;

const ActionCard = ({ leftIcon, actionText, rightIcon }: ActionCardProps) => {
    return (
        <span className="action-card shadow ion-no-margin">
            {leftIcon ? <IonIcon src={leftIcon}  /> : null }
            {actionText ? <span>{actionText}</span> : null}
            {rightIcon ? <IonIcon src={rightIcon} size="small" color="medium" slot="end" /> : null}
        </span>
    );
};

export default ActionCard;

ActionCard.defaultProps = actionCardDefaultProps;
