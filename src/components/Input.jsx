import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import addNotification from 'react-push-notification';
import sound from './../sounds/soobshenie-telegram.mp3';

const Input = () => {

    const [text, setText] = useState('');
    const { data } = useContext(ChatContext);
    const [stateSendBtn, setStateSendBtn] = useState(true);
    const song = new Audio(sound);

    useEffect(() => {
        if (text.length > 0 && text.match(/^\s+$/) === null) { // проверка на пробел
            setStateSendBtn(false);
        }
        else if (text.length == 0) {
            setStateSendBtn(true);
        }
    }, [text])

    const handleKeyDown = (e) => {
        e.code === 'Enter' && text.length > 0 && text.match(/^\s+$/) === null && handleSend();
    }

    const handleSend = async () => {

        try {
            await updateDoc(doc(db, "users", data.contact.uid), { //Чтобы обновить некоторые поля документа без перезаписи всего документа
                messages: arrayUnion({  //Если ваш документ содержит поле массива, arrayUnion() добавляет элементы в массив
                    message: text,
                    owner: '0',
                    time: Timestamp.now()
                })
            });
            setText('');

            const res = await fetch('https://api.chucknorris.io/jokes/random');
            const answer = await res.json();

            setTimeout(async () => {
                await updateDoc(doc(db, "users", data.contact.uid), {
                    messages: arrayUnion({
                        message: answer.value,
                        owner: '1',
                        time: Timestamp.now()
                    })
                });

                song.play();
                addNotification({ // заменить например создать новую базу данных с одним сообщением, на него слушатель, перезавписывать каждый раз на новое
                    title: data.contact.displayName,
                    subtitle: 'This is a subtitle',
                    message: (answer.value.length > 60) ? answer.value.slice(0, 65 - 1) + '…' : answer.value, 
                    theme: 'darkblue',
                    native: false // when using native, your OS will handle theming.
                });
            }, 3000);
        }

        catch (err) {
            console.log('INPUT-----ERROR', err);
        }
    }


    return (
        <div className="input">
            <input type="text" placeholder="Type your message" onKeyDown={handleKeyDown} onChange={e => setText(e.target.value)} value={text} />
            <button disabled={stateSendBtn} onClick={handleSend}>Send</button>
        </div>
    )
}

export default Input;