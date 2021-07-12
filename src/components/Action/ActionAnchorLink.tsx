import React from "react";
import ActionCard, {
  actionCardDefaultProps,
  ActionCardProps,
} from "./ActionCard";
import { arrowForward } from "ionicons/icons";

const defaultProps = {
  ...actionCardDefaultProps,
  rightIcon: arrowForward,
};

const ActionAnchorLink = ({
  href,
  actionText,
  rightIcon,
  leftIcon,
  ...restAnchorProps
}: ActionCardProps & React.HTMLProps<HTMLAnchorElement>) => {
  const cardProps = {
    actionText,
    rightIcon,
    leftIcon,
  };
  return (
    <a {...restAnchorProps} href={href} className="no-text-decoration">
      <ActionCard {...cardProps} />
    </a>
  );
};

ActionAnchorLink.defaultProps = defaultProps;

export default ActionAnchorLink;
