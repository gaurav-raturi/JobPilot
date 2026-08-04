import { Bot, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';


const AIChatWindow = ( {onclose} ) => {

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender : 'ai',
            text : "👋 Hi Gaurav! I'm your AI Career Assistant. Ask me anything about jobs, resumes, interviews, or React!"
        }
    ]);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    //Auto-scroll to bottom whenever messages array updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behaviour : 'smooth'
        });
    }, [messages]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSendMessage = async () => {

        if(isTyping) return;

        if(!input.trim())  return;

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                sender : 'user',
                text : input,
                time : new Date().toLocaleTimeString([], {
                    hour : '2-digit',
                    minute : '2-digit'
                })
            }
        ]);

        setInput('');

        setIsTyping(true);

        try {

            const response = await axios.post(
                'http://localhost:5000/api/ai/chat',
                {
                    message : input
                }
            );

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender : 'ai',
                    text : response.data.reply,
                    time : new Date().toLocaleTimeString([], {
                        hour : '2-digit',
                        minute : '2-digit'
                    })
                }
            ]);
        }
        catch(error) {
            console.error(error);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    sender : 'ai',
                    text : 'Sorry, something went wrong'
                }
            ]);
        }

        finally {
            setIsTyping(false);
        }

    }

  return (
    <div className='fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col'>

      { /*Header*/ }
      <div className='relative p-4 bg-blue-600 text-white rounded-t-2xl'>
        <div className='flex items-center justify-center gap-2'>
            <Bot size={22} />
            <h2 className='font-semibold text-lg'>AI Career Assistant</h2>
        </div>

        <button
        className='absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-blue-700 transition'
        onClick={onclose}>
            <X size={22}/>
        </button>
      </div>
      
      { /*Body*/ }
      <div className='flex-1 overflow-y-auto space-y-3 p-4'>
        {messages.map((message, index) => (
            <div 
            key={index}
            className={`flex mb-3 ${
                message.sender === 'ai'
                    ? 'justify-start'
                    : 'justify-end'
            }`}
            >
                <div 
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    message.sender === 'ai'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-blue-600 text-white'
                }`}
                >
                <p>{message.text}</p>

                <p className={`text-xs mt-1 opacity-70 text-right ${
                    message.sender === 'ai'
                        ? 'text-gray-500'
                        : 'text-blue-100'
                }`}
                >
                    {message.time}
                </p>
            </div>
            </div>
        ))}

        {isTyping && (
            <div className='flex justify-start mb-3'>
                <div className='bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl italic'>
                    🤖 AI is typing...
                </div>

                <div ref={messagesEndRef}></div>    
            </div>  
        )}
      </div>

      { /*Footer*/ }
      <div className='p-4 border-t flex gap-2'>
        <input
        ref={inputRef}
        type='text'
        placeholder='Ask me anything...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
            if(e.key === 'Enter') {
                handleSendMessage();
            }
        }}
        className='flex-1 border rounded-lg p-2 outline-none'/>

        <button
        onClick={handleSendMessage}
        disabled={isTyping}
        className='bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700'>
            {isTyping ? 'Thinking' : 'Send'}
        </button>
        </div>
    </div>
  );
};

export default AIChatWindow;
