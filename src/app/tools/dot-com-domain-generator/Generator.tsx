"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaCopy, FaCheck, FaGlobe, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'
import { DomainNamesGenerator, DomainNamesGeneratorMutation, DomainNamesGeneratorMutationVariables } from 'src/gql/graphql'
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest'
import { useMutation } from '@tanstack/react-query'
import TextInput from 'src/features/react-hook-form/TextField'
import TextAreaInput from 'src/features/react-hook-form/TextArea'
import SelectInput from 'src/features/react-hook-form/Select'
import Button from 'src/components/Button'

interface FormData {
  businessName: string
  businessDescription: string
  customPrompt?: string
  domainExtension: string
}

interface DomainResult {
  __typename?: string
  item: string
  available: boolean
  price?: number | null | undefined
}

interface DomainCategory {
  __typename?: string
  category: string
  items: DomainResult[]
}

interface ApiResponse {
  __typename?: string
  success?: boolean | null | undefined
  message?: string | null | undefined
  personalizedGuide?: string | null | undefined
  data?: DomainCategory[] | null | undefined
}

export default function Generator() {
  const [results, setResults] = useState<ApiResponse | null>(null)
  const [copiedDomains, setCopiedDomains] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      businessName: '',
      businessDescription: '',
      customPrompt: '',
      domainExtension: '.com'
    }
  })

  const mutateDomainNamesGenerator = useGraphqlClientRequest<
    DomainNamesGeneratorMutation,
    DomainNamesGeneratorMutationVariables
  >(DomainNamesGenerator.loc?.source.body!)
  
  const { mutateAsync, isPending } = useMutation({ 
    mutationFn: mutateDomainNamesGenerator,
    onSuccess: (data) => {
      setResults(data.getDomainNames)
      setError(null)
    },
    onError: (error: any) => {
      setError(error.message || 'Failed to generate domain names. Please try again.')
      setResults(null)
    }
  })

  const domainExtensions = [
    { label: '.com', value: '.com' },
    // { label: '.net', value: '.net' },
    // { label: '.org', value: '.org' },
    // { label: '.io', value: '.io' },
    // { label: '.co', value: '.co' },
    // { label: '.app', value: '.app' },
    // { label: '.dev', value: '.dev' },
    // { label: '.tech', value: '.tech' }
  ]

  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({
        input: {
          businessName: data.businessName,
          businessDescription: data.businessDescription,
          customPrompt: data.customPrompt || '',
          domainExtension: data.domainExtension
        }
      })
    } catch (error) {
      console.error('Error generating domains:', error)
    }
  }

  const copyToClipboard = async (domain: string) => {
    try {
      await navigator.clipboard.writeText(domain)
      setCopiedDomains(prev => new Set([...prev, domain]))
      setTimeout(() => {
        setCopiedDomains(prev => {
          const newSet = new Set(prev)
          newSet.delete(domain)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const resetForm = () => {
    reset()
    setResults(null)
    setError(null)
    setCopiedDomains(new Set())
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-900 px-8 py-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Generate Your Perfect Domain
        </h2>
        <p className="text-gray-100 text-center mt-2">
          Enter your business details and get AI-generated domain suggestions with real-time availability checking
        </p>
      </div>
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Form Section */}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TextInput
                control={control}
                name="businessName"
                label="Business Name"
                placeholder="Enter your business or project name"
                required
                error={!!errors.businessName?.message}
                helpertext="The main name of your business or project"
              />
              
              <SelectInput
                control={control}
                name="domainExtension"
                label="Domain Extension"
                options={domainExtensions}
                required
                error={!!errors.domainExtension?.message}
              />
            </div>

            <TextAreaInput
              control={control}
              name="businessDescription"
              label="Business Description"
              placeholder="Describe what your business does, your target audience, and key features..."
              rows={4}
              required
              error={!!errors.businessDescription?.message}
              helpertext="Provide details about your business to generate relevant domain names"
            />

            <TextAreaInput
              control={control}
              name="customPrompt"
              label="Custom Requirements (Optional)"
              placeholder="Any specific keywords, style preferences, or requirements for the domain names..."
              rows={3}
              error={!!errors.customPrompt?.message}
              helpertext="Add any specific requirements or preferences for your domain names"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                type="submit"
                label={isPending ? "Generating Domains..." : "Generate Domain Names"}
                loading={isPending}
                startAdornment={!isPending && <FaGlobe className="mr-2" />}
                className="sm:w-auto bg-gray-900 hover:bg-gray-800 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
              />
              
              {results && (
                <Button
                  type="button"
                  variant="outlined"
                  label="Generate New"
                  onClick={resetForm}
                  className="sm:w-auto border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-all duration-200"
                />
              )}
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-600 mr-4 text-xl" />
              <div>
                <h4 className="text-red-800 font-semibold">Error Generating Domains</h4>
                <p className="text-red-800 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-8 mt-12">
            <div className="text-center bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Live Results Generated
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Your AI-Generated Domain Names
              </h3>
              {results.personalizedGuide && (
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  {results.personalizedGuide}
                </p>
              )}
            </div>

            {results.data?.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 capitalize">
                    {category.category.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                </div>
                
                <div className="p-6">
                  <div className="grid gap-3">
                    {category.items.map((domain, domainIndex) => (
                      <div
                        key={domainIndex}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                          domain.available
                            ? 'bg-white border-gray-200 hover:border-gray-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            domain.available ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          <div>
                            <span className="font-mono text-lg font-semibold text-gray-900">
                              {domain.item}
                            </span>
                            {domain.available && domain.price && (
                              <div className="text-sm text-gray-500 mt-1">
                                Registration: ${domain.price}/year
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            domain.available
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {domain.available ? 'Available' : 'Taken'}
                          </span>
                          
                          {domain.available && (
                            <button
                              onClick={() => copyToClipboard(domain.item)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all duration-200"
                              title="Copy domain name"
                            >
                              {copiedDomains.has(domain.item) ? (
                                <FaCheck className="text-green-500" />
                              ) : (
                                <FaCopy />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Tips Section */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  Professional Domain Selection Tips
                </h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Best Practices:</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Choose domains that are easy to spell and remember
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Avoid hyphens and numbers when possible
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Consider the .com extension for better credibility
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Next Steps:</h5>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Check social media availability for your chosen domain
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Register your domain quickly as availability can change
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">✓</span>
                      Consider trademark searches before finalizing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isPending && (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200">
              <div className="relative">
                <FaSpinner className="animate-spin text-4xl text-gray-600 mx-auto mb-6" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generating Your Domain Names</h3>
              <p className="text-gray-600 mb-4">Our AI is analyzing your business details and checking domain availability...</p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
