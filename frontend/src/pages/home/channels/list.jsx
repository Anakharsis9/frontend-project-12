import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveChannelId,
  switchActiveChannel,
} from "@/features/channelsSlice";
import { Nav, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useGetChannelsQuery } from "@/features/channelsSlice";
import { AddNewChannelButton } from "./add";
import { RemoveChannelModal } from "./remove";
import { useState } from "react";
import { RenameChannelModal } from "./rename";
import { useTranslation } from "react-i18next";

const ChannelListItem = ({ channel, isActive }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
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
              name={channel.name}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>

            <Dropdown.Toggle split variant={isActive ? "secondary" : "none"} />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowRemoveModal(true)}>
                {t("channels.remove.action")}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowEditModal(true)}>
                {t("channels.rename.action")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            className="w-100 text-start rounded-0"
            variant={isActive ? "secondary" : "none"}
            onClick={() => dispatch(switchActiveChannel(channel.id))}
            name={channel.name}
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
        )}
      </Nav.Item>
      <RemoveChannelModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        channelId={channel.id}
      />
      <RenameChannelModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        channel={channel}
      />
    </>
  );
};

export const ChannelsList = () => {
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const activeChannelId = useSelector(selectActiveChannelId);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t("channels.title")}</b>
        <AddNewChannelButton />
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
