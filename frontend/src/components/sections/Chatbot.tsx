 import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import axios from 'axios'
import "../../chatbot.css"
import {IoSend} from 'react-icons/io5'
import {FaRobot} from 'react-icons/fa'
import { Footer } from './Footer'
import PageButtons from '../layout/PageButtons'

 
const sendMessageAPI = async(message)=>{
    const res = await axios.post("http://localhost:9090/ask",{message});
    return res.data;
}

 const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [conversations, setConversations] = useState([{role:"assistant", content: "Hello! At your service!"}]);
  
    const mutation = useMutation({
        mutationFn: sendMessageAPI,
        mutationKey:['chatbot'],
        onSuccess:(data)=>{
            setIsTyping(false);
            setConversations((prevConversation)=> [
                ...prevConversation,
                {role:"assistant", content: data.message}
            ])
        }
    })

    const handleSubmitMessage = () => {
        const currentMessage = message.trim();
        if(!currentMessage){
            alert("Please enter a message");
            return;
        }
         setConversations((prevConversation)=> [
                ...prevConversation,
                {role:"user", content: currentMessage}
        ])
        setIsTyping(true);
        mutation.mutate(currentMessage);
        setMessage('')
    }
  
  console.log(mutation)
  
  
    return (
     <>
     <PageButtons/>
        <div className='header'>
            
            <p className='description'>Enter your dietary goals, location, and needed ingredients, 
                and discover the best‑priced groceries nearby—filterable by tags like organic or sugar‑free. Be specific!
                 </p>
            <div className='chat-container'>
                <div className='conversation'>
                    {conversations.map((entry,index)=>(<div className={`message ${entry.role}`} key={index}>
                        
                            {entry.content}
                      
                    </div>))}
                    {isTyping && (<>Typing...</>)}
                </div>
                <div className='input-area'>
                    <input className='input-message' type = "text" placeholder='Enter message' value ={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={(e)=>e.key==='Enter' && handleSubmitMessage()}/>
                    <button onClick={handleSubmitMessage} className='send-btn'>{mutation?.isPending ? "Loading" : <IoSend/>}</button>
                </div>
            </div>
        </div>
       
     </>
   )
 }
 
 export default Chatbot