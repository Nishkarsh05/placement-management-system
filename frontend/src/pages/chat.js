import { useEffect, useState } from 'react';
import api from '../utils/api';
import { getCurrentUser } from '../utils/auth';

function Chat() {
  const currentUser = getCurrentUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const response = await api.get('/messages/users');
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load chat users');
    }
  };

  const loadMessages = async (userId) => {
    try {
      const response = await api.get(`/messages/${userId}`);
      setMessages(response.data.messages || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load messages');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSuggestion('');
    loadMessages(user._id);
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (!selectedUser || !message.trim()) return;

    try {
      const response = await api.post('/messages', {
        receiver: selectedUser._id,
        message,
      });

      setMessages([...messages, response.data.chatMessage]);
      setMessage('');
      setSuggestion('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not send message');
    }
  };

  const handleSuggestReply = async () => {
    try {
      const lastMessage = messages[messages.length - 1]?.message || '';

      const response = await api.post('/google-ai/suggest-reply', {
        role: currentUser?.role,
        lastMessage,
        context: selectedUser
          ? `Chatting with ${selectedUser.name}, role ${selectedUser.role}`
          : 'No selected user',
      });

      setSuggestion(response.data.suggestion);
    } catch (err) {
      setSuggestion(err.response?.data?.message || 'Could not generate suggestion');
    }
  };

  const useSuggestion = () => {
    setMessage(suggestion);
  };

  return (
    <div className="pageBlock">
      <div className="pageHeader">
        <div>
          <p className="eyebrow">Student Recruiter Communication</p>
          <h2>Chat</h2>
        </div>
      </div>

      {error && <p className="errorText">{error}</p>}

      <div className="chatLayout">
        <aside className="chatUsers panel">
          <h3>People</h3>

          {users.length === 0 && (
            <p className="mutedText">No users found yet. Register one student and one recruiter.</p>
          )}

          {users.map((user) => (
            <button
              key={user._id}
              type="button"
              className={
                selectedUser?._id === user._id
                  ? 'chatUser activeChatUser'
                  : 'chatUser'
              }
              onClick={() => handleSelectUser(user)}
            >
              <strong>{user.name}</strong>
              <span>{user.role} · {user.email}</span>
            </button>
          ))}
        </aside>

        <section className="chatWindow panel">
          {!selectedUser ? (
            <div className="emptyChat">
              <h3>Select a person to start chatting</h3>
              <p>Students can ask recruiters about jobs, eligibility, interviews, and application status.</p>
            </div>
          ) : (
            <>
              <div className="chatHeader">
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.role} · {selectedUser.email}</p>
                </div>

                <button className="secondaryButton" type="button" onClick={handleSuggestReply}>
                  AI Suggest Reply
                </button>
              </div>

              <div className="messageList">
                {messages.length === 0 && (
                  <p className="mutedText">No messages yet. Send the first message.</p>
                )}

                {messages.map((chatMessage) => {
                  const isMine = chatMessage.sender?._id === currentUser?.id;

                  return (
                    <div
                      key={chatMessage._id}
                      className={isMine ? 'messageBubble myMessage' : 'messageBubble theirMessage'}
                    >
                      <p>{chatMessage.message}</p>
                      <span>{chatMessage.sender?.name}</span>
                    </div>
                  );
                })}
              </div>

              {suggestion && (
                <div className="aiSuggestion">
                  <p>{suggestion}</p>
                  <button type="button" onClick={useSuggestion}>
                    Use this reply
                  </button>
                </div>
              )}

              <form className="chatForm" onSubmit={handleSend}>
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type your message"
                />
                <button className="primaryButton" type="submit">
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Chat;