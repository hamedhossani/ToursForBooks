import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styles
import Avatar from "@material-ui/core/Avatar";
import ExploreIcon from "@material-ui/icons/LocalSee";
import DiningIcon from "@material-ui/icons/LocalDining";
import ExperienceIcon from "@material-ui/icons/NaturePeople";
import GuiderIcon from "@material-ui/icons/SupervisorAccount";
import WalkingIcon from "@material-ui/icons/DirectionsWalk";
import BikingIcon from "@material-ui/icons/DirectionsBike";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import FilterList from "@material-ui/icons/FilterList";

const Icon = props => {
  const { iconName } = props;
  switch (iconName) {
    case "LocalDining":
      return <DiningIcon />;
    case "NaturePeople":
      return <ExperienceIcon />;
    case "LocalSee":
      return <ExploreIcon />;
    case "SupervisorAccount":
      return <GuiderIcon />;
    case "Guider":
      return <GuiderIcon />;
    case "Walking":
      return <WalkingIcon />;
    case "Bicycle":
      return <BikingIcon />;
    case "Motorcycle":
      return <MotorcycleIcon />;
    case "Boat":
      return (
        <FontAwesomeIcon icon="faShip" size="sm" style={{ color: "#fff" }} />
      );
    case "BusTransport":
      return (
        <FontAwesomeIcon
          icon="faBus"
          size="sm"
          style={{ color: "rgba(0, 0, 0, 0.4)" }}
        />
      );
    case "BoatTransport":
      return (
        <FontAwesomeIcon
          icon="faShip"
          size="sm"
          style={{ color: "rgba(0, 0, 0, 0.4)" }}
        />
      );
    case "LocationCity":
      return <LocationCityIcon />;
    case "LocalDrink":
      return <LocalDrinkIcon />;
    case "MusicNote":
      return <MusicNoteIcon />;
    case "Friendly":
      return (
        <FontAwesomeIcon icon="faSmile" size="sm" style={{ color: "#fff" }} />
      );
    case "LocalPeople":
      return (
        <FontAwesomeIcon
          icon="faComments"
          size="sm"
          style={{ color: "#fff" }}
        />
      );
    case "MeetUp":
      return (
        <FontAwesomeIcon
          icon="faMapMarkerAlt"
          size="sm"
          style={{ color: "#fff" }}
        />
      );
    case "Sun":
      return (
        <FontAwesomeIcon icon="faSun" size="sm" style={{ color: "#fff" }} />
      );
    case "Film":
      return (
        <FontAwesomeIcon icon="faFilm" size="sm" style={{ color: "#fff" }} />
      );
    case "FilterList":
      return <FilterList />;
    default:
      return null;
  }
};

function getColor(iconName) {
  switch (iconName) {
    case "FilterList":
      return ["#fff", "#189AB4"];
    case "LocalDining":
      return ["#fff", "#FFBB00"];
    case "NaturePeople":
      return ["#fff", "#00A54D"];
    case "LocalSee":
      return ["#fff", "#0099FF"];
    case "Guider":
      return ["#fff", "#E5008D"];
    case "LocationCity":
      return ["#fff", "#7012BC"];
    case "Film":
      return ["#fff", "#00A54D"];
    case "LocalDrink":
      return ["#fff", "#FF4800"];
    case "MusicNote":
      return ["#fff", "#00A54D"];
    case "Friendly":
      return ["#fff", "#C900DB"];
    case "LocalPeople":
      return ["#fff", "#00cc9c"];
    case "MeetUp":
      return ["#fff", "#E5008D"];
    case "Boat":
      return ["#fff", "#ed5300"];
    case "Sun":
      return ["#fff", "#FF4800"];
    case "Walking":
      return ["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0)"];
    case "Bicycle":
      return ["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0)"];
    case "Motorcycle":
      return ["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0)"];
    case "BoatTransport":
      return ["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0)"];
    case "BusTransport":
      return ["rgba(0, 0, 0, 0.4)", "rgba(0,0,0,0)"];
    default:
      return [];
  }
}

const MaterialIcon = props => {
  const { iconName, children, className, onClick } = props;
  const colorSet = getColor(iconName);
  return (
    <div className={classNames(className)} onClick={onClick}>
      {children}
      <Avatar style={{ color: colorSet[0], backgroundColor: colorSet[1] }}>
        <Icon iconName={iconName} />
      </Avatar>
    </div>
  );
};

export default MaterialIcon;
