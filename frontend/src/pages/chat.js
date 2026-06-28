import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';
import { getUser } from '../utils/auth';

const demoPeople = [
  {
    _id: 'demo-student',
    name: 'Student Demo',
    role: 'student',
    email: 'student@test.com',
  },
  {
    _id: 'demo-recruiter',
    name: 'Recruiter Demo',
    role: 'recruiter',
    email: 'recruiter@test.com',
  },
  {
    _id: 'demo-tpo',
    name: 'TPO Coordinator',
    role: 'tpo',
    email: 'tpo@test.com',
  },
];

const demoMessages = [
  {
    _id: 'm1',
    fromMe: false,
    text: 'Hello, I reviewed your profile. Your React and Node.js skills look relevant for our frontend role.',
  },
  {
    _id: 'm2',
    fromMe: true,
    text: 'Thank you. I have also uploaded my resume and GitHub projects.',
  },
  {
    _id: 'm3',
    fromMe: false,
    text: 'Great. Please be ready for a technical round on JavaScript, APIs, and MongoDB basics.',
  },
];

function Chat() {
  const user = getUser() || {};
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [messages, setMessages] = useState(demoMessages);
  const [messageText, setMessageText] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const data = await apiRequest('/messages/users');
        const users = data.users || [];

        if (users.length === 0) {
          setPeople(demoPeople);
          setSelectedPerson(demoPeople[0]);
          setNotice('Showing demo chat contacts for presentation.');
          return;
        }

        setPeople(users);
        setSelectedPerson(users[0]);
        setNotice('');
      } catch {
        setPeople(demoPeople);
        setSelectedPerson(demoPeople[0]);
        setNotice('Showing demo chat contacts for presentation.');
      }
    };

    loadPeople();
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (!messageText.trim()) return;

    const newMessage = {
      _id: Date.now().toString(),
      fromMe: true,
      text: messageText.trim(),
    };

    setMessages((current) => [...current, newMessage]);
    setMessageText('');

    try {
      await apiRequest('/messages', {
        method: 'POST',
        body: JSON.stringify({
          receiver: selectedPerson?._id,
          text: newMessage.text,
        }),
      });
    } catch {
      setNotice('Message added in demo mode. Backend chat can be connected later.');
    }
  };

  return (
    <div className="pageStack">
      <section className="pageHero">
        <p className="eyebrow">Student Recruiter Communication</p>
        <h2>Chat</h2>
        <p>
          {user.role === 'recruiter'
            ? 'Talk with shortlisted students, answer questions, and share interview updates.'
            : 'Ask recruiters about eligibility, interviews, job details, and application status.'}
        </p>
      </section>

      {notice && <div className="softNotice">{notice}</div>}

      <section className="chatLayout">
        <div className="surface">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">People</p>
              <h3>Contacts</h3>
            </div>
          </div>

          <div className="peopleList">
            {people.map((person) => (
              <button
                key={person._id}
                type="button"
                className={`personButton ${selectedPerson?._id === person._id ? 'active' : ''}`}
                onClick={() => setSelectedPerson(person)}
              >
                <strong>{person.name}</strong>
                <span>{person.role}</span>
                <small>{person.email}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="surface chatBox">
          {selectedPerson ? (
            <>
              <div className="sectionHeader">
                <div>
                  <p className="eyebrow">{selectedPerson.role}</p>
                  <h3>{selectedPerson.name}</h3>
                </div>
                <span className="countPill">Online</span>
              </div>

              <div className="messages">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`messageBubble ${message.fromMe ? 'me' : ''}`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <form className="chatInputRow" onSubmit={sendMessage}>
                <input
                  className="formInput"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  placeholder="Type your message"
                />
                <button className="primaryButton" type="submit">
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="emptyState">
              <h3>Select a person to start chatting</h3>
              <p>Students and recruiters can communicate about interviews and applications.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Chat;