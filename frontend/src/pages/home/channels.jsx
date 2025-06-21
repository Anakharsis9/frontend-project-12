import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveChannelId,
  switchActiveChannel,
} from "@/features/channelsSlice";
import { Nav, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useGetChannelsQuery } from "@/features/channelsSlice";

const ChannelListItem = ({ channel, isActive }) => {
  const dispatch = useDispatch();

  return (
    <Nav.Item className="w-100">
      {channel.removable ? (
        <Dropdown
          as={ButtonGroup}
          variant={isActive ? "secondary" : "none"}
          className="d-flex"
        >
          <Button
            variant={isActive ? "secondary" : "none"}
            className="w-100 rounded-0 text-start text-truncate"
            onClick={() => dispatch(switchActiveChannel(channel.id))}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>

          <Dropdown.Toggle split variant={isActive ? "secondary" : "none"} />
          <Dropdown.Menu>
            <Dropdown.Item>Удалить</Dropdown.Item>
            <Dropdown.Item>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          className="w-100 text-start rounded-0"
          variant={isActive ? "secondary" : "none"}
          onClick={() => dispatch(switchActiveChannel(channel.id))}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      )}
    </Nav.Item>
  );
};

export const ChannelsList = () => {
  const { data: channels } = useGetChannelsQuery();
  const activeChannelId = useSelector(selectActiveChannelId);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button className="p-0 text-primary btn btn-group-vertical">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav
        variant="pills"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            channel={channel}
            isActive={activeChannelId === channel.id}
          />
        ))}
      </Nav>
    </>
  );
};
