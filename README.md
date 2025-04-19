// mutation syntax 


//query syntax 

  const querySignupUrl = useGraphqlClientRequest<
    GetGoogleOauthUrlQuery,
    GetGoogleOauthUrlQueryVariables
  >(GetGoogleOauthUrl.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getGoogleAuthUrl.url;
  };

  const { data: signupUrl } = useQuery({
    queryKey: ['getGoogleAuthUrl'],
    queryFn: fetchData,
  });


  // mutation syntax 

    const mutateLoginRequest = useGraphqlClientRequest<LogInUserMutation, LogInUserMutationVariables>(
    LogInUser.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateLoginRequest });
