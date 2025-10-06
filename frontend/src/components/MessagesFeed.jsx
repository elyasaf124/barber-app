import React, { useEffect, useState } from 'react';
import { getMessages } from '../api/api';

function MessagesFeed({ barberId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages(barberId ? 'barber' : 'global', barberId).then(res => setMessages(res.data));
  }, [barberId]);

  return (
    <div>
      {messages.map(msg => (
        <div key={msg.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
          <strong>{msg.title}</strong>
          <p>{msg.body}</p>
        </div>
      ))}
    </div>
  );
}

export default MessagesFeed;
