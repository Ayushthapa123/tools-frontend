'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import {
  GetToolBySlug,
  GetToolBySlugQuery,
  GetToolBySlugQueryVariables,
  Tool,
} from 'src/gql/graphql';

import { Suspense, useState } from 'react';
import { ToolCreateAndTestForm } from './ToolCreateAndTestForm';
import Button from 'src/components/Button';
import { SetMetadataForm } from './SetMetadataForm';
import { WriteArticleForm } from './WriteArticleForm';
import { UploadImagesForm } from './UploadImagesForm';

export default function ToolContainer({ params }: { params: { slug: string } }) {
  const isEdit = params?.slug !== 'new';

  const queryTool = useGraphqlClientRequest<GetToolBySlugQuery, GetToolBySlugQueryVariables>(
    GetToolBySlug.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryTool({ slug: params?.slug });
    return res.getToolBySlug;
  };

  const { data: tool, isLoading } = useQuery({
    queryKey: ['getToolBySlug', params.slug],
    queryFn: fetchData,
    enabled: isEdit,
  });
  return (
    <Suspense>
      <div>{!isLoading && <ToolForm params={params} tool={tool as Tool | undefined} />}</div>
    </Suspense>
  );
}

function ToolForm({ params, tool }: { params: { slug: string }; tool: Tool | undefined | null }) {
  const slug = params?.slug;
  const isEdit = slug !== 'new';
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(Number(searchParams.get('step')) || 1);

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-center">
            {/* <h2 className="text-xl font-semibold">Step {currentStep} of 3</h2> */}
            <div className="steps steps-horizontal text-gray-600">
              <div className={`step ${currentStep >= 1 ? 'step-primary' : ''}`}>Tool Details</div>
              <div className={`step ${currentStep >= 2 ? 'step-primary' : ''}`}>Set Metadata</div>
              <div className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>
                Write Article/Instruction
              </div>
              <div className={`step ${currentStep >= 3 ? 'step-primary' : ''}`}>Set Images</div>
            

              <div className={`step ${currentStep >= 4 ? 'step-primary' : ''}`}>Preview & Save</div>
            </div>
          </div>
          <div className="flex justify-start">
            <h2 className="text-xl font-semibold">{tool?.data?.name}</h2>
          </div>
        </div>

        <div className="flex h-[calc(100vh-300px)] flex-col  gap-4 overflow-y-auto">
          <div>
            {currentStep === 1 && (
              <ToolCreateAndTestForm isEdit={isEdit} tool={tool as Tool | undefined} />
            )}
          </div>
          <div>{currentStep === 2 && <SetMetadataForm tool={tool} />}</div>
          <div>{currentStep === 3 && <WriteArticleForm tool={tool as Tool | undefined} />}</div>
          <div>{currentStep === 4 && <UploadImagesForm tool={tool as Tool | undefined} />}</div>

        </div>
        <div className="flex justify-end">
          <div className="mt-6 flex justify-end gap-2 ">
            {isEdit && currentStep > 1 && (
              <Button label="Back" onClick={handleBack} className="btn btn-primary w-min" />
            )}

            {isEdit && (
              <Button label="Next" onClick={handleNext} className="btn btn-primary w-min" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
