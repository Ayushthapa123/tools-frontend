import React, { useState, useRef } from 'react'
import { Modal } from 'src/components/Modal';
import  Button  from 'src/components/Button';
import { Input } from 'src/components/Input';
import RichTextEditor  from 'src/components/RichTextEditor';
interface Iprops {
  name: string; 
  email: string; 
  hostelId: string;
}
export default function CustomEmailModal(props: Iprops) {
  const [open, setOpen] = useState(false);
  const { name, email, hostelId } = props; 
  const [subject, setSubject] = useState('');
  const descriptionRef = useRef("");
  const description = descriptionRef.current;

  // function to send email
  const sendEmail = () => {
    console.log(subject, description);
  }
  return (
    <div>
      <Button onClick={() => setOpen(true)} label="Email Icon" />
      <Modal open={open} handleClose={() => setOpen(false)}>
        <div>
          <h1>Custom Email</h1>
          <div className="flex flex-col gap-2"></div>
          <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} /> 

          <RichTextEditor editorRef={descriptionRef} />
          <Button onClick={sendEmail} label="Send Email" />
        </div>
      </Modal>
    </div>
  );
}
