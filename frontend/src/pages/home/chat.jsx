import { useSelector } from 'react-redux'
import { Form, InputGroup } from 'react-bootstrap'
import { useFormik } from 'formik'

import {
  selectActiveMessages,
  useAddMessageMutation,
} from '@/features/messagesSlice'
import { selectActiveChannel } from '@/features/channelsSlice'
import { selectUser } from '@/features/authSlice'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const Chat = () => {
  const { t } = useTranslation()

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const user = useSelector(selectUser)
  const activeChannel = useSelector(selectActiveChannel)
  const messages = useSelector(selectActiveMessages)

  const [addMessage, { isLoading: isAddMessageLoading, isSuccess }]
    = useAddMessageMutation()

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: ({ body }, { resetForm }) => {
      addMessage({
        body,
        channelId: activeChannel.id,
        username: user.username,
      })
        .unwrap()
        .then(() => {
          resetForm()
        })
    },
  })

  useEffect(() => {
    if (isSuccess && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSuccess])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({})
  }, [messages.length])

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {activeChannel?.name}
          </b>
        </p>
        <span className="text-muted">
          {t('chat.messageCount', { n: messages.length })}
        </span>
      </div>
      <div id="chat" className="overflow-auto px-5">
        {messages.map(message => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            :
            {message.body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-auto px-5 py-3">
        <Form
          noValidate
          className="py-1 border rounded-2"
          onSubmit={formik.handleSubmit}
        >
          <InputGroup>
            <Form.Control
              ref={inputRef}
              name="body"
              placeholder={t('chat.labels.messageBody')}
              className="border-0 p-0 ps-2"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isAddMessageLoading}
              autoFocus
              aria-label={t('chat.labels.aria')}
            />
            <button
              type="submit"
              disabled={!formik.values.body || isAddMessageLoading}
              className="btn btn-group-vertical"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-right-square"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                >
                </path>
              </svg>
              <span className="visually-hidden">
                {t('common.actions.send')}
              </span>
            </button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}
