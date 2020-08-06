import React, { useState } from 'react';
import {
  Comment, Avatar, Tooltip, Card, Form, Button, Input, List,
} from 'antd';
import moment from 'moment';

import './ClientFeedback.scss';

const { TextArea } = Input;

const Datetime = ({ date }) => (
  <Tooltip
    title={date.format('YYYY-MM-DD HH:mm:ss')}
  >
    <span>
      {date.fromNow()}
    </span>
  </Tooltip>
);

const Editor = ({
  onClientChange, onFeedbackChange, onSubmit, submitting, client, feedback,
}) => (
  <Form>
    <Form.Item
      rules={[
        {
          required: true,
          message: 'Please enter a client name',
        },
      ]}
    >
      <Input
        placeholder="Client Name"
        disabled={submitting}
        style={{ width: '40%', minWidth: '200px' }}
        onChange={onClientChange}
        value={client}
      />
    </Form.Item>
    <Form.Item
      rules={[
        {
          required: true,
          message: 'Please enter some feedback',
        },
      ]}
    >
      <TextArea
        placeholder="Client Feedback"
        disabled={submitting}
        rows={4}
        onChange={onFeedbackChange}
        value={feedback}
      />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);

const ClientFeedback = () => {
  const cleanEditForm = {
    client: '',
    feedback: '',
  };

  const [state, setState] = useState({
    submitting: false,
    comments: [{
      client: 'Han Solo [Globex Corporation]',
      feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      date: moment('12-25-2018', 'MM-DD-YYYY'),
    }],
    ...cleanEditForm,
  });

  const { comments } = state;

  return (
    <Card
      title={`Client Feedback (${comments.length} ${comments.length > 1 ? 'comments' : 'comment'})`}
    >
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={({ client, feedback, date }) => (
          <Comment
            actions={[
              <span>Edit</span>,
              <span>Delete</span>,
            ]}
            author={<a>{client}</a>}
            avatar={(
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt={client}
              />
          )}
            content={<p>{feedback}</p>}
            datetime={<Datetime date={date} />}
          />
        )}
        pagination={{ pageSize: 5, position: 'both' }}
      />

      <Comment
        avatar={(
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          )}
        content={(
          <Editor
            client={state.client}
            feedback={state.feedback}
            submitting={state.submitting}
            onClientChange={({ target }) => {
              setState((oldState) => ({ ...oldState, client: target.value }));
            }}
            onFeedbackChange={({ target }) => {
              setState((oldState) => ({ ...oldState, feedback: target.value }));
            }}
            onSubmit={() => {
              setState(({ comments: oldComments, client, feedback }) => ({
                submitting: true,
                comments: [...oldComments, {
                  client,
                  feedback,
                  date: moment(),
                }],
                ...cleanEditForm,
              }));
              setTimeout(() => {
                setState((oldState) => ({ ...oldState, submitting: false }));
              }, 1000);
            }}
          />
)}
      />
    </Card>
  );
};
export default ClientFeedback;
