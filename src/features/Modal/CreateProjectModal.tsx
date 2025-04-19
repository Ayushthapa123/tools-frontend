//@ts-nocheck
'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { Input } from 'src/components/Input';
import {
  CreateProject,
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from 'src/gql/graphql';
import Toast from '../Toast';

export const CreateProjectModal = () => {
  const [projectName, setProjectName] = useState('');
  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  const mutateCreateProject = useGraphqlClientRequest<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CreateProject.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateProject });

  const handleNewProject = () => {
    mutateAsync({ input: { projectName: projectName, userId: 1 } }).then(res => {
      if (res?.createProject?.projectId) {
        router.push(`/app/${res.createProject.projectId}`);
      } else {
        // alert('failed to create project');
        setShowAlert(true);
        setMessage('Failed to create project');
      }
    });
  };

  return (
    <div>
      <button className="btn" onClick={() => document?.getElementById('my_modal_5')?.showModal()}>
        Start New Project
      </button>
      {showAlert && <Toast role="error" message={message} />}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create Project</h3>
          <p className="py-4">Please provide a descriptive project name!</p>
          <Input
            label="Project Name"
            required
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />

          <div className="modal-action">
            <form method="dialog" className=" flex gap-5">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>

              <button className="btn btn-primary" onClick={() => handleNewProject()}>
                Create New Project
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
