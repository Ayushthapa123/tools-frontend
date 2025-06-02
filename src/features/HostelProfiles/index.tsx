import React from 'react'
import OnboardingCompletion from './OnboardingCompletion'
import HostelStats from './HostelStats'
export default function HostelProfiles({hasOnboardingComplete}:{hasOnboardingComplete:boolean}) {
  return (
    <div>
        {hasOnboardingComplete ? <HostelStats /> : <OnboardingCompletion />}
    </div>
  )
}
