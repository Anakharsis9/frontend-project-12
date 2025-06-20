import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import {
  loadChannels,
  switchActiveChannel,
} from "../../features/channelsSlice";
import {
  Nav,
  Col,
  Container,
  Row,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export const HomePage = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const channels = useSelector((state) => state.channels.data);
  const activeChannelId = useSelector(
    (state) => state.channels.activeChannelId
  );

  useEffect(() => {
    axios
      .get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(loadChannels(response.data));
      });
  }, [token, dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={4}
          md={2}
          className="border-end px-0 bg-light flex-column h-100 d-flex"
        >
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
              <Nav.Item key={channel.id} className="w-100">
                {channel.removable ? (
                  <Dropdown
                    as={ButtonGroup}
                    variant={
                      activeChannelId === channel.id ? "secondary" : "none"
                    }
                    className="d-flex"
                  >
                    <Button
                      variant={
                        activeChannelId === channel.id ? "secondary" : "none"
                      }
                      className="w-100 rounded-0 text-start text-truncate"
                      onClick={() => dispatch(switchActiveChannel(channel.id))}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </Button>

                    <Dropdown.Toggle
                      split
                      variant={
                        activeChannelId === channel.id ? "secondary" : "none"
                      }
                    />
                    <Dropdown.Menu>
                      <Dropdown.Item>Удалить</Dropdown.Item>
                      <Dropdown.Item>Переименовать</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Button
                    className="w-100 text-start rounded-0"
                    variant={
                      activeChannelId === channel.id ? "secondary" : "none"
                    }
                    onClick={() => dispatch(switchActiveChannel(channel.id))}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                )}
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100"></Col>
      </Row>
    </Container>
  );
};
