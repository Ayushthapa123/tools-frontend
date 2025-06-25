import React, { useState, useRef } from 'react'
import { Modal } from 'src/components/Modal';
import  Button  from 'src/components/Button';
import { Input } from 'src/components/Input';
import RichTextEditor  from 'src/components/RichTextEditor';
import IconButton from 'src/components/IconButton';
import { FaEnvelope } from "react-icons/fa"
import { LogInUser, SendCustomEmail, SendCustomEmailMutationVariables } from 'src/gql/graphql';
import { LogInUserMutationVariables } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { SendCustomEmailMutation } from 'src/gql/graphql';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
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

  const mutateSendCustomEmail = useGraphqlClientRequest<SendCustomEmailMutation, SendCustomEmailMutationVariables>(
    SendCustomEmail.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateSendCustomEmail });

  

  // function to send email
  const sendEmail = () => {
    if(!subject  || !email || !name){
      enqueueSnackbar('Please fill all the fields', { variant: 'error' });
      return;
    }
    mutateAsync({ email, name, subject, htmlContent: descriptionRef.current }).then(
      res => {
        if (res?.sendCustomEmail) {
          //after login what to do before pushing him to dashboard/me
          setOpen(false);
          enqueueSnackbar('Email sent successfully', { variant: 'success' });
          // localStorage.setItem('refreshToken', res.loginUser.token.refreshToken);
        }else{
          enqueueSnackbar('Failed to send email', { variant: 'error' });
        }
      }
    )
  }
  return (
    <div>
      <IconButton onClick={() => setOpen(true)}  className='text-primary text-3xl'>
        Mail:<FaEnvelope />
      </IconButton>
      <Modal open={open} handleClose={() => setOpen(false)} onSave={sendEmail} actionLabel='Send Email'>
        <div className='p-4 '>
          <h1>Custom Email</h1>
          <p>to: {email}</p>
          <div className="flex flex-col gap-2">
            <Input label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} /> 
            <RichTextEditor editorRef={descriptionRef} />
          </div>

        </div>
      </Modal>
    </div>
  );
}
