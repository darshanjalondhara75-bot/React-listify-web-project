import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import { isAuthenticated } from '../actions/auth';
import { Divider, Comment, Icon, List } from 'semantic-ui-react';
import { Spin, Avatar, Empty, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import MessageInputField from '../messages/MessageInputField';
import Message from '../messages/Message';
import { getUser, setMsgToUnread, markMessageRead } from '../actions/user';
import { getChats, deleteChat } from '../actions/chat';
import { Link } from 'react-router-dom';
import newMsgSound from './newMessageSound';
import { useDispatch, useSelector } from 'react-redux';

const scrollDivToBottom = (divRef) =>
  divRef.current !== null &&
  divRef.current.scrollIntoView({ behaviour: 'smooth' });

const ChatList = () => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    photo: '',
  });
  const { name, photo } = userData;

  const [infiniteScroll, setInfiniteScroll] = useState({
    loading: false,
    hasMore: true,
  });
  const { loading, hasMore } = infiniteScroll;

  const { user, token } = isAuthenticated();

  const dispatch = useDispatch();

  const { message } = queryString.parse(window.location.search);
  const navigate = useNavigate();

  const divRef = useRef();

  const openChatId = useRef('');

  const loadChats = async () => {
    try {
      const res = await getChats(user._id);
      setChats(res.data);
      if (user && user._id) {
        const read = await markMessageRead({
          userId: user._id,
        });
        dispatch({
          type: 'USER_DETAILS',
          payload: read.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (chats.length > 0 && !message) {
      navigate(`/messages?&message=${chats[0].messagesWith}`);
    }
  }, [chats, message, navigate]);

  const sendMsg = (msg) => {
    console.log('Mock Send Message:', msg);
  };

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const deleteMsg = (messageId) => {
    setMessages((prev) =>
      prev.filter((message) => message._id !== messageId)
    );
  };

  const deleteMessage = async (messagesWith) => {
    try {
      const res = await deleteChat(messagesWith, { userId: user._id, token });

      setChats((prev) =>
        prev.filter((chat) => chat.messagesWith !== messagesWith)
      );
      navigate('/messages');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInfiniteOnLoad = () => {
    setInfiniteScroll({
      loading: true,
    });
    if (chats.length > 14) {
      //   message.warning('Infinite List loaded all');
      setInfiniteScroll({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };

  return (
    <div className='row container-fluid mx-auto mt-4 profile-container'>
      <div className='col-md-4 mx-auto mb-5'>
        <div className='card rounded-0 profile-card card-shadow'>
          <div className='d-flex justify-content-between card-header profile-card p-3'>
            <h2 className='text-center d-flex align-items-center'> Messages</h2>
          </div>
          {chats.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
          <>
            <div className='card-body demo-infinite-container'>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
              >
                {chats.map((chat, i) => {
                  return (
                    <div key={i}>
                      <List selection>
                        <List.Item
                          active={message === chat.messagesWith}
                          onClick={() =>
                            navigate(
                              `/messages?&message=${chat.messagesWith}`
                            )
                          }
                        >
                          <Comment.Group>
                            <Comment>
                              <Comment.Avatar
                                as='a'
                                src={
                                  chat.profilePicUrl ? (
                                    chat.profilePicUrl
                                  ) : (
                                    <Avatar>{chat.name[0]}</Avatar>
                                  )
                                }
                              />
                              <Comment.Content>
                                <Comment.Author as='a'>
                                  {chat.name}{' '}
                                  {connectedUsers.length > 0 &&
                                    connectedUsers.filter(
                                      (user) =>
                                        user.userId === chat.messagesWith
                                    ).length > 0 && (
                                      <Icon
                                        name='circle'
                                        size='small'
                                        color='green'
                                      />
                                    )}
                                </Comment.Author>

                                <Comment.Metadata>
                                  <div>{moment(chat.date).fromNow()}</div>
                                  <div
                                    style={{
                                      position: 'absolute',
                                      right: '2px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <Tooltip title='Delete chat?'>
                                      <Icon
                                        name='trash alternate'
                                        color='red'
                                        className='me-auto'
                                        onClick={() =>
                                          deleteMessage(chat.messagesWith)
                                        }
                                      />
                                    </Tooltip>
                                  </div>
                                </Comment.Metadata>

                                <Comment.Text>
                                  {chat.lastMessage.length > 20
                                    ? `${chat.lastMessage.substring(0, 20)} ...`
                                    : chat.lastMessage}
                                </Comment.Text>
                              </Comment.Content>
                            </Comment>
                          </Comment.Group>
                        </List.Item>
                        {loading && hasMore && (
                          <div className='demo-loading-container'>
                            <Spin />
                          </div>
                        )}
                      </List>
                      <Divider />
                    </div>
                  );
                })}
              </InfiniteScroll>
            </div>
          </>
        </div>
      </div>

      <div className='col-md-8 mb-5'>
        {message && (
          <div className='card rounded-0 profile-card card-shadow'>
            {message && (
              <Link to={`/user/${message}`}>
                <div className='d-flex align-items-center card-header profile-card p-3'>
                  <Avatar src={photo}>{name[0]}</Avatar>
                  <p
                    className='text-center ms-3 text-dark1'
                    style={{ fontWeight: '600' }}
                  >
                    {name}
                  </p>
                </div>
              </Link>
            )}
            <div
              className='card-body'
              style={{
                overflow: 'auto',
                overflowX: 'hidden',
                maxHeight: '35rem',
                height: '35rem',
              }}
            >
              {messages.map((message, i) => (
                <Message
                  divRef={divRef}
                  key={i}
                  bannerProfilePic={photo === undefined ? '' : photo}
                  message={message}
                  user={user}
                  setMessages={setMessages}
                  deleteMsg={deleteMsg}
                />
              ))}
            </div>
            <MessageInputField sendMsg={sendMsg} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;

