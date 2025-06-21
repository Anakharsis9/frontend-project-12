import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Chat } from "./chat";
import { ChannelsList } from "./channels/list";
import { useGetChannelsQuery } from "@/features/channelsSlice";
import { useGetMessagesQuery } from "@/features/messagesSlice";

export const HomePage = () => {
  const { isLoading: areChannelsLoading } = useGetChannelsQuery();
  const { isLoading: areMessagesLoading } = useGetMessagesQuery();

  if (areChannelsLoading || areMessagesLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col
          xs={4}
          md={2}
          className="border-end px-0 bg-light flex-column h-100 d-flex"
        >
          <ChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};
