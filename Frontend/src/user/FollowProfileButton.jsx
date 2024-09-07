import propTypes from "prop-types";
import { follow } from "./api-user";
import { Button } from "@mui/material";

export default function FollowProfileButton(props) {
  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };
  return (
    <div>
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </div>
  );
}
FollowProfileButton.propTypes = {
  following: propTypes.bool.isRequired,
  onButtonClick: propTypes.func.isRequired,
};
