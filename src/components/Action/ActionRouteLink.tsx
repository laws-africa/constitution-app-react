import React from 'react';
import ActionCard, {actionCardDefaultProps, ActionCardProps} from "./ActionCard";
import {Link} from "react-router-dom";

const defaultProps = {
    ...actionCardDefaultProps,
    routerLink: "",
}

type ActionLinkProps = ActionCardProps & {
    routerLink?: string,
} & typeof defaultProps;

const ActionRouteLink = ({ routerLink, actionText, rightIcon, leftIcon } : ActionLinkProps) => {
    const cardProps = {
        actionText,
        rightIcon,
        leftIcon
    }
    return (
        <Link to={routerLink} className="no-text-decoration">
            <ActionCard
                {...cardProps}
            />
        </Link>
    );
};

ActionRouteLink.defaultProps = defaultProps;

export default ActionRouteLink;
